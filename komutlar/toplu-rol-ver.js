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
    .setDescription("Sunucudaki herkese verilmesini istediğiniz rolü etiketlemelisiniz!")
    message.channel.send(embed)
    
    return
  }
  
  /*if (!message.guild.roles.get(role)) {
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription("Sunucuda `" + role + "` isminde bir rol bulunmuyor!")
    message.channel.send(embed)
    
    return;
  }*/
  
  message.channel.send("Sunucudaki herkese `" + role.name + "` adlı rol veriliyor... Bu biraz zaman alabilir.")
  
  var rol = message.guild.roles.get(role.id);
  
  try {
    message.guild.members.forEach(async (user, id) => {
     user.addRole(rol)
  });
  } catch(e){
      //console.log(e.stack);
  }
  
  setTimeout(function() {
  
    message.channel.send("Sunucudaki herkese başarıyla `" + role.name + "` adlı rol verildi!")
    
  }, 60000)
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["herkese-rol-ver"],
    permLevel: 4,
    kategori: "premium"
  };
  
  exports.help = {
    name: 'toplu-rol-ver',
    description: 'İstediğiniz rolü sunucudaki herkese verir.',
    usage: 'toplu-rol-ver <@rol>'
  };