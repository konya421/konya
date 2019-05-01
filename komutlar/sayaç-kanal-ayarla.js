const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/sKanal.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('sayaç-kanal-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('sayaç-kanal-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            sayacKanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/sKanal.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`sKanal_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setDescription(`${dil.basarili}: ${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayaç-kanal-belirle'],
    permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
}

exports.help = {
    name: 'sayaç-kanal-ayarla',
    description: 'Sayaç kanalını ayarlar.',
    usage: 'sayaç-kanal-ayarla <#kanal>',
  enname: 'set-counter-channel',
  endescription: 'Sets the counter channel.',
  enusage: 'set-counter-channel <#channel>'
}