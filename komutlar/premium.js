const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('premium').help.name
  var header = "Premium Nasıl Aktif Edilir? (Ücretsiz)"
  var msg = "Sunucunuzda botun kullandığınız her komutu sunucunuza puan kazandırmaktadır. Sunucunuz 50 puana ulaştığında Premium otomatik olarak aktif edilecek, sunucu sahibine özel mesaj olarak ve Sunucu seviyesini 50 puan yapan 50 puan için son komutun kullanıldığı kanala bildirilecektir."
  var n = "Sunucu puanını nereden göreceğim?"
  var g = "`k!premium puan` yazarak görebilirsiniz."
  var k = "Premium Aktif Sunucular"
  var l = "`k!premium liste` yazarak görebilirsiniz."
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('premium').help.enname
        var header = "How to Activate Premium? (Free)"
        var msg = "Every command you use on your server gives you points for your server. When your server reaches 50 points, Premium will be automatically activated, you will be notified as a private message to the server owner and to the channel where the last command is used for 50 points with 50 points."
        var n = "Where will I see the server score?"
        var g = "You can see by writing `k!premium point`."
        var k = "Premium Active Servers"
        var l = "You can see by writing `k!premium list`."
    }
    const dil = client[s]
    const o = a
  
var i = args.slice(0).join(' ');
    
  let str = ""
 for(var a = 0; a < client.guilds.size; a++) {
  if (db.has(`premium_${client.guilds.array()[a].id}`)) {
      str += `${client.guilds.array()[a].name} \n`.replace("KONYA", "**KONYA**")
  }
}
  
if (!i) {
  
let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - Premium`, client.user.avatarURL)
.addField(header, msg)
.addField(n, g)
.addField(k, l)
//.addField("Premium Durumu", db.has(`premium_${message.guild.id}`) ? db.fetch(`premium_${message.guild.id}`).replace("aktif", "") : "Sunucu puanı 50 puana ulaşmadığı için De-Aktif.")
message.channel.send(embed)
  return;
}
  
  if (i === "liste" || i === "list") {
    let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - Premium`, client.user.avatarURL)
.addField(k, str)
message.channel.send(embed)
    return;
  }
  
  if (i === "puan" || i === "point") {
    let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - Premium`, client.user.avatarURL)
.setDescription(db.fetch(`sunucuxp_${message.guild.id}`)+"/2" || 2)
message.channel.send(embed)
    return;
  }
  
  if (i === "aç" || i === "aktif") {
    
    if (message.author.id !== "441169716547944448") return message.channel.send(`:x: Bunu Sadece Sahibim Kullanabilir !`);
    
    db.set(`premium_${message.guild.id}`, "aktif")
    db.set(`sunucuxp_${message.guild.id}`, 50)
    
    let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - Premium`, client.user.avatarURL)
.setDescription("Premium mod bu sunucu için başarıyla Aktif edildi!")
message.channel.send(embed)
    
  }
  
  if (i === "kapat" || i === "deaktif" || i === "de-aktif") {
    
    if (message.author.id !== "441169716547944448") return message.channel.send(`:x: Bunu Sadece Sahibim Kullanabilir !`);
    
    db.delete(`premium_${message.guild.id}`)
    db.delete(`sunucuxp_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - Premium`, client.user.avatarURL)
.setDescription("Premium mod bu sunucu için başarıyla De-Aktif edildi!")
message.channel.send(embed)
    
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['premium-bilgi'],
  permLevel: 0,
  kategori: "genel",
  category: "general"
};

exports.help = {
  name: 'premium',
  description: 'Premium hakkında bilgi verir. (Ücretsiz)',
  usage: 'premium',
  enname: 'premium',
  endescription: 'Gives information about Premium. (Free)',
  enusage: 'premium',
};