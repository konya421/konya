const Discord = require('discord.js')
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('destek-kanal-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('destek-kanal-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let kanal = message.mentions.channels.first();
  
    if (!kanal) {
      let e = new Discord.RichEmbed()
      .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
      .setColor("RANDOM")
      message.channel.send(e)
      return;
    }
  
    var s = db.set(`destekK_${message.guild.id}`, kanal.id)
  
    const embed = new Discord.RichEmbed()
    .setTitle(dil.basarili)
    .setDescription("<#"+s+">")
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["destek-kanal"],
    permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
  };

  exports.help = {
    name: 'destek-kanal-ayarla',
    description: 'Gelişmiş Destek Sistemindeki destek kanalını değiştirmenizi sağlar.',
    usage: 'destek-kanal-ayarla <#kanal>',
    enname: 'set-support-channel',
    endescription: 'Enhanced Support Allows you to change the support channel in the system.',
    enusage: 'set-support-channel <#channel>'
  };