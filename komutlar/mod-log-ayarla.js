const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let kanal = JSON.parse(fs.readFileSync("././jsonlar/mLog.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('mod-log-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('mod-log-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            modlog: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/mLog.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
  db.set(`mLog_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setDescription(`${dil.basarili}: ${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log-belirle'],
    permLevel: 4,
    kategori: "moderasyon",
  category: "moderation"
}

exports.help = {
    name: 'mod-log-ayarla',
    description: 'Moderasyon kayıtları kanalını ayarlar.',
    usage: 'mod-log-ayarla <#kanal>',
  enname: 'set-mod-log',
  endescription: 'The moderation records sets the channel.',
  enusage: 'set-mod-log <#channel>'
}