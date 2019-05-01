const Discord = require("discord.js")

exports.run = (client, message, args) => {
  message.delete()

  var embed = new Discord.RichEmbed()

.setTitle(`<a:serit:559815474607816718> Konya Bot Bilgi ` ,message.author.avatarURL)
.addField(`Sahip`, `<@530713851675672587>`,true) //imdatt efe dc bak bi haa burda niye hata var
.addField(`Kodlayan`,`<@530713851675672587>`,true)
.addField(`Geliştiricisi`,`<@259440195802234880>`,true)
.addField(`Geliştiricisi`,`<@309617463857905674>`,true)
.setColor("GREEN")
.setThumbnail(client.user.avatarURL) // şş saşlkda guild
.addField(`Sunucu Sayısı`,client.guilds.size,true) // bu varmı böyle bişe hm unutum 1 dk
.addField(`Kullanıcı Sayısı`,client.users.size,true) // nası ya sldak neydi ?
.addField(`Komut Sayısı`,client.commands.size,true)
.addField(`Discord.js Versiyon`,Discord.version,true)
.addField(`Bot ID`,client.user.id,true) //cilent olan herşey botla ilgimi ? timam
.setDescription(`** <a:red:572163715139371020> [Destek Sunucusu !](https://invite.gg/konya)  <a:red:572163715139371020> [Bot Davet !](https://discordapp.com/oauth2/authorize?client_id=559720149175894038&scope=bot&permissions=2146958847)  <a:red:572163715139371020> [Bota Oy Ver !](https://discordbots.org/bot/559720149175894038/vote)**`)
.setTimestamp()
.setFooter(`${message.author.username} | Tarafından Kontrol Ediliyor..`, message.author.avatarURL )
message.channel.sendEmbed(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yapıcı"],
  permLevel: 0,
  kategori: "genel",
};

exports.help = {
  name: 'yapımcım',
  description: 'Bot Yapımcısını Gösterir.',
  category: 'genel',
  usage: 'test'
};