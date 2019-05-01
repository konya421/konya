const Discord = require('discord.js');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  if (db.has(`premium_${message.guild.id}`) === false) {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Bu komutu kullanabilmeniz için Premium modun aktif olması gerek!")
    .addField("Premium Nasıl Aktif Edilir? (Merak etmeyin paralı değil)", "Sunucunuzda botun kullandığınız her komutu sunucunuza puan kazandırmaktadır. Sunucunuz 50 puana ulaştığında Premium otomatik olarak aktif edilecek, sunucu sahibine özel mesaj olarak ve Sunucu seviyesini 50 puan yapan 50 puan için son komutun kullanıldığı kanala bildirilecektir.")
    .addField("Sunucu Puanını Nerden Göreceğim?", "`k!sunucu-bilgi` veya `k!premium puan` yazarak görebilirsiniz.")
    message.channel.send(e)
    return
  }
  
  let role = message.mentions.roles.first()
  
  if (!role) { 
    
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sunucudaki herkesten alınmasını istediğiniz rolü etiketlemelisiniz!")
    message.channel.send(embed)
    
    return;
  }
  
  /*if (!message.guild.roles.get(role)) {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sunucuda `" + role + "` isminde bir rol bulunmuyor!")
    message.channel.send(embed)
    
    return;
  }*/
  
  message.channel.send("Sunucudaki herkesten `" + role.name + "` adlı rol alınıyor... Bu biraz zaman alabilir.")
  
  var rol = message.guild.roles.get(role.id);
  
  try {
    message.guild.members.forEach(async (user, id) => {
     user.removeRole(rol)
  });
  } catch(e){
      //console.log(e.stack);
  }
  
 /* if ("s") {
    message.channel.send("Sunucudaki herkesten başarıyla `" + role.name + "` adlı rol alındı!")
  };*/
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["herkesten-rol-al"],
    permLevel: 4,
    kategori: "premium"
  };
  
  exports.help = {
    name: 'toplu-rol-al',
    description: 'İstediğiniz rolü sunucudaki herkesten alır.',
    usage: 'toplu-rol-al <@rol>'
  };