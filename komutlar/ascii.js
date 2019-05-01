const Discord = require('discord.js');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');

exports.run = function(client, message, args) {
message.delete()
  const db = require('quick.db');
  var s = 'tr'
  var a = client.commands.get('ascii').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('ascii').help.enname
    }
  const dil = s
  const o = a
  
  var yazi = args.slice(0).join(' ');
  if (yazi.length < 1) {
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(client[dil].argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    message.channel.send(embed)
    return
  }
  if (yazi.length > 8) return message.reply(client[dil].karakter.replace("{sayı}", "8"))
  
   ascii(yazi, {
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply(`${client[dil].error} ${err}`)
          console.error(err)
        }
     
        message.channel.send(data, {
          code: 'text'
        })
      })
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0,
  kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'ascii',
  description: 'Yazdığınız yazıyı ascii şekline çevirir.',
  usage: 'ascii <yazı>',
  enname: 'ascii',
  endescription: 'The text you write turns into a ascii.',
  enusage: 'ascii <text>'
};