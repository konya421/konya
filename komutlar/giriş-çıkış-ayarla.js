const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('giriş-çıkış-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('giriş-çıkış-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let channel = message.mentions.channels.first()
  
    if (!channel) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!kanal[message.guild.id]){
        kanal[message.guild.id] = {
            gkanal: channel.id
        };
    }
  
    fs.writeFile("././jsonlar/gc.json", JSON.stringify(kanal), (x) => {
        if (x) console.error(x)
      })*/
  
    var s = db.set(`gc_${message.guild.id}`, "<#"+channel.id+">")
  
    const embed = new Discord.RichEmbed()
    .setTitle(dil.basarili)
    .setDescription(`${channel}`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hoş-geldin-ayarla', 'giriş-çıkış-belirle'],
    permLevel: 4,
    kategori: "ayarlar",
   category: "settings"
}

exports.help = {
    name: 'giriş-çıkış-ayarla',
    description: 'Giriş çıkış kanalını ayarlar.',
    usage: 'giriş-çıkış-ayarla <#kanal>',
  enname: 'set-input-output',
  endescription: 'Sets the input and output channel.',
  enusage: 'set-input-output <#channel>'
}