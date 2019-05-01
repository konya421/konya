const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/log.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('log-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('log-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            log: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/log.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`log_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setDescription(`${dil.basarili}: ${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['log-belirle'],
    permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
}

exports.help = {
    name: 'log-ayarla',
    description: 'Sunucu kayıtları kanalını ayarlar.',
    usage: 'log-ayarla <#kanal>',
  enname: 'set-log',
  endescription: 'The server records sets the channel.',
  enusage: 'set-log <#channel>'
}