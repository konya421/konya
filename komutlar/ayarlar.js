const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  message.delete()
  var s = 'tr'
  var m = "`"+client.ayarlar.prefix+"ayarlar destek` yazarak görebilirsiniz."
  var l = "Liste"
  var o = "Sıfırlanmasını istediğiniz ayarı yazınız! \nBir ayarı sıfırlamak için o ayarın anahtar kelimesini yazmalısınız. \nAnahtar kelimeler için `k!ayarlar liste` yazabilirsiniz."
  var f = "NOT: \"k!ayarlar kapat hepsi\" yazar iseniz bütün ayarları sıfırlar."
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var m = "To see: `"+client.ayarlar.prefix+"settings support`"
        var l = "List"
        var o = "Write the setting you want to reset! To reset a setting, you must type the keyword for that setting. You can type `k!settings list` for keywords."
        var f = "NOTE: \"k!settings off all\" settings if they are all writers."
    }
  const dil = client[s]
  
  const a = args[0]
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:red:553927970117517313> Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`).then(msg => msg.delete(5000));
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || `${dil.ayarlar.errors.degismemis} **(k!)**`;
  
  
if (!a && a !== "destek" && a !== "kapat" && a !== "liste" && a !== "support" && a !== "off" && a !== "list") {
 
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`» ${message.guild.name} ${dil.ayarlar.header} «`, `https://cdn.discordapp.com/emojis/456224342427041803.png?v=1`)
  .setThumbnail(message.guild.iconURL)
  .addField(dil.ayarlar.supportHeader, m)
  .addField("**\n**",`**------------Sunucu Ayarlarınız Aşağıdadır------------** **\n**`)
  .addField(dil.ayarlar.serverprefix, db.has(`prefix_${message.guild.id}`) ? `<:onay:553921635418112000>` + db.fetch(`prefix_${message.guild.id}`) : `<:red:553927970117517313> Değiştirilmemiş (k!)`, true)
  .addField(dil.ayarlar.tag, db.has(`tagB_${message.guild.id}`) ? `<:onay:553921635418112000>` + db.fetch(`tagB_${message.guild.id}`) : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.gc, db.has(`gc_${message.guild.id}`) ? `<:onay:553921635418112000>` + db.fetch(`gc_${message.guild.id}`)  : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.log, db.has(`log_${message.guild.id}`) ? `<:onay:553921635418112000> ${db.fetch(`log_${message.guild.id}`)}` : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.mlog, db.has(`mLog_${message.guild.id}`) ? `<:onay:553921635418112000> ${db.fetch(`mLog_${message.guild.id}`)}` : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.otorol, db.has(`otoR_${message.guild.id}`) ? `<:onay:553921635418112000>\`@${message.guild.roles.get(db.fetch(`otoR_${message.guild.id}`)).name}\`` : `<:red:553927970117517313> Ayarlanmamış`, true)

  .addField(dil.ayarlar.kufurengel, db.has(`küfürE_${message.guild.id}`) ? `<:onay:553921635418112000> ${dil.ayarlar.errors.acik}` : `<:red:553927970117517313> Kapalı` ,true)
  .addField(dil.ayarlar.linkengel, db.has(`linkE_${message.guild.id}`) ? `<:onay:553921635418112000> ${dil.ayarlar.errors.acik}` : `<:red:553927970117517313> Kapalı`, true)
    .addField(dil.ayarlar.capsE, db.has(`capsE_${message.guild.id}`) ? `<:onay:553921635418112000> Açık ${dil.ayarlar.errors.acik}` : `<:red:553927970117517313> Kapalı`, true)

  .addField(dil.ayarlar.susturrol, db.has(`sRol_${message.guild.id}`) ? `<:onay:553921635418112000> \`@${message.guild.roles.get(db.fetch(`sRol_${message.guild.id}`)).name}\`` : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.sayack, db.has(`sKanal_${message.guild.id}`) ? `<:onay:553921635418112000> ${db.fetch(`sKanal_${message.guild.id}`)}` : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.sayac, db.has(`sayac_${message.guild.id}`) ? `<:onay:553921635418112000> ${db.fetch(`sayac_${message.guild.id}`)}` : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.davetK, db.has(`dKanal_${message.guild.id}`) ? `<:onay:553921635418112000> ${db.fetch(`dKanal_${message.guild.id}`)}` : `<:red:553927970117517313> Ayarlanmamış`, true)
 

  .addField(dil.ayarlar.gm, db.has(`girisM_${message.guild.id}`) ? ` <:onay:553921635418112000> ` + db.fetch(`girisM_${message.guild.id}`).replace("{kullanıcı}", "**{kullanıcı}**").replace("{user}", "**{user}**") : `<:red:553927970117517313> Ayarlanmamış`, false)
  .addField(dil.ayarlar.cm, db.has(`cikisM_${message.guild.id}`) ? ` <:onay:553921635418112000> ` + db.fetch(`cikisM_${message.guild.id}`).replace("{kullanıcı}", "**{kullanıcı}**").replace("{user}", "**{user}**") : `<:red:553927970117517313> Ayarlanmamış`, true)
    .setTimestamp()
  .setFooter(`${message.author.username} | Yetkili Tarafından Kontrol Ediliyor..`, message.author.avatarURL )
  message.channel.send(embed)
  return;
}
  
  if (a === "destek" || a === "support") {
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setThumbnail(message.guild.iconURL)
  .setAuthor(`» ${message.guild.name} ${dil.ayarlar.supportHeader} «`, `https://cdn.discordapp.com/emojis/456224342427041803.png?v=1`)
  .addField(dil.ayarlar.destekK, db.has(`destekK_${message.guild.id}`) ? `<:onay:553921635418112000>` + " <#"+db.fetch(`destekK_${message.guild.id}`)+">" : `<:red:553927970117517313> Ayarlanmamış`, true)
  .addField(dil.ayarlar.destekR, db.has(`destekR_${message.guild.id}`) ? `<:onay:553921635418112000>` + " `@"+message.guild.roles.get(db.fetch(`destekR_${message.guild.id}`)).name+"`" : `<:red:553927970117517313> Ayarlanmamış`, true)
  .setTimestamp()
  .setFooter(`${message.author.username} | Yetkili Tarafından Kontrol Ediliyor..`, message.author.avatarURL )
  message.channel.send(embed)
  return;
 }
  
if (a === "liste" || a === "list") {
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(l)
  .addField(dil.ayarlar.gc, "`giriş-çıkış`")
  .addField(dil.ayarlar.mlog, "`mod-log`")
  .addField(dil.ayarlar.log, "`log`")
  .addField(dil.ayarlar.linkengel, "`link-engel`")
  .addField(dil.ayarlar.kufurengel, "`küfür-engel`")
  .addField(dil.ayarlar.capsE, "`caps-engelle`")
  .addField(dil.ayarlar.otorol, "`oto-rol`")
  .addField(dil.ayarlar.susturrol, "`sustur-rol`")
  .addField(dil.ayarlar.sayack, "`sayaç-kanal`")
  .addField(dil.ayarlar.sayac, "`sayaç`")
  .addField(dil.ayarlar.tag, "`tag`")
  .addField(dil.ayarlar.gm, "`giriş-mesaj`")
  .addField(dil.ayarlar.cm, "`çıkış-mesaj`")
  .addField(dil.ayarlar.destekK, "`destek-kanal`")
  .addField(dil.ayarlar.destekR, "`destek-rol`")
  message.channel.send(embed)
}
  
if (a === "kapat" || a === "off") {
  
  var x = args[1];
  
  if (!x) {
    let e = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(o)
    .setFooter(f)
    message.channel.send(e)
  }
  
  if (x === "giriş-çıkış") {
    db.delete(`gc_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
    if (x === "tag") {
    db.delete(`tagB_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "mod-log") {
    db.delete(`mLog_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "log") {
    db.delete(`log_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "link-engel") {
    db.delete(`linkE_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "küfür-engel") {
    db.delete(`küfürE_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
    if (x === "caps-engelle") {
    db.delete(`capsE_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "oto-rol") {
    db.delete(`otoR_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sustur-rol") {
    db.delete(`sRol_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sayaç-kanal") {
    db.delete(`sKanal_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "sayaç") {
    db.delete(`sayac_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "giriş-mesaj") {
    db.delete(`girisM_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "çıkış-mesaj") {
    db.delete(`cikisM_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "destek-kanal") {
    db.delete(`destekK_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "destek-rol") {
    db.delete(`destekR_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
  }
  
  if (x === "hepsi" || x === "all") {
    
    db.delete(`gc_${message.guild.id}`)
    
    db.delete(`mLog_${message.guild.id}`)

    db.delete(`log_${message.guild.id}`)
    
    db.delete(`linkE_${message.guild.id}`)

    db.delete(`küfürE_${message.guild.id}`)
    
    db.delete(`capsE_${message.guild.id}`)

    db.delete(`otoR_${message.guild.id}`)
    
    db.delete(`sRol_${message.guild.id}`)
  
    db.delete(`sKanal_${message.guild.id}`)
  
    db.delete(`sayac_${message.guild.id}`)
  
    db.delete(`girisM_${message.guild.id}`)
  
    db.delete(`cikisM_${message.guild.id}`)
    
    db.delete(`destekK_${message.guild.id}`)

    db.delete(`destekR_${message.guild.id}`)
    
    let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(dil.basarili)
    message.channel.send(embed)
    
  }
  
}
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["settings"],
    permLevel: 0,
    kategori: "sunucu",
  category: "server"
  };
  
  exports.help = {
    name: 'ayarlar',
    description: 'Sunucu ayarlarını gösterir.',
    usage: 'ayarlar',
    enname: 'settings',
  endescription: 'Shows the server settings.',
  enusage: 'settings'
  };