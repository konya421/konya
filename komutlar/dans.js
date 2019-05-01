const Discord = require('discord.js');
const oneLine = require('common-tags').oneLine;
const ascii = require('figlet');

exports.run = function(client, message, args) {
message.delete()
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('dans').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('dans').help.enname
    }
    const dil = client[s]
    const o = a
  
  var yazi = args.slice(0).join(' ');
  if (yazi.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  if (yazi.length > 8) return message.reply(dil.karakter.replace("{sayı}", "8"))
  
   ascii(yazi, {
        font: 'Dancing Font',
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
      },
      function(err, data) {
        if (err) {
          message.reply(`${dil.error} ${err}`)
          console.error(err)
        }
     
     message.channel.send('```css\n' + data + '\n```');

     
      })
  
};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["dans-ascii"],
  permLevel: 0,
    kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'dans',
  description: 'Yazdığınız yazıyı dans🎉 ascii şekline çevirir.',
  usage: 'dans <yazı>',
  enname: 'dance',
  endescription: 'The writing makes the dancer ascii.',
  enusage: 'dance <text>'
};