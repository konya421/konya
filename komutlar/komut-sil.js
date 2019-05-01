const Discord = require('discord.js'); 
const db = require('quick.db'); 

exports.run = async (client, message, args) => { 
  
  db.delete(`komutkomut_${message.guild.id}_${db.fetch(`komutkomuts_${message.guild.id}`) + 1}`)
  db.delete(`cevapcevap_${message.guild.id}_${db.fetch(`komutkomuts_${message.guild.id}`) + 1}`)
  db.set(`komutkomuts_${message.guild.id}`, db.fetch(`komutkomuts_${message.guild.id}`) - 1)

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
   .setDescription(`Komutu Başarılı Bi Şekilde Sildiniz`) 
    message.channel.send(embed)

 }

exports.conf = { 
  enabled: false, 
  guildOnly: false, 
  aliases: ['komutsil', 'komut-kaldır'], 
  permLevel: 4,
    kategori: "özel"
}; 

exports.help = { 
  name: 'komut-sil', 
  description: 'Sunucuya özel komutlardan istenilen komutu siler.', 
  usage: 'komut-sil <komut ismi>'
};