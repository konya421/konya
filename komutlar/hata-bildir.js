const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.delete()
if (!message.guild) {
const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: UYARI ! :warning:', '`Hatabildir` Adlı Komutu Dm Den Kulanamazsın Bilgine.')
return message.author.sendEmbed(ozelmesajuyari); }
let guild = message.guild
let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setTitle(`Konya Bot - Hata Bildirimi`).setColor("RANDOM").setDescription('\`\`\`Doğru Kullanım :: k!hatabildir hata Gibi!\`\`\` '));
  const tavsiye1 = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(':open_file_folder: Hata Başarıyla Gönderildi !\n:page_facing_up: Hata İletildi Teşekürler.')
  message.channel.send(tavsiye1);
const tavsiye = new Discord.RichEmbed()
  .setTitle(`Konya Bot - Hata Bildirimi`)
  .setColor("RANDOM")
  .setThumbnail(message.author.avatarURL)
  .setDescription(':newspaper2: **' + message.author.tag + '** adlı kullanıcının Hatası;')
  .addField(':envelope: Gönderen Kişinin Bilgileri', '• Kullanıcı ID: ' + message.author.id + '\n• Kullanıcı Adı: ' + message.author.username + '\n• Kullanıcı Tag: ' + message.author.discriminator + '')
  .addField(':pencil: Gönderilen Hata', mesaj)
return client.channels.get("573064951506141184").send(tavsiye);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Hatabildir'],
  permLevel: 0,
  kategori: "iletisim"
};

exports.help = {
  name: 'hata-bildir',
  description: 'Botta bulunan hatayı gönderir.',
  usage: 'n!hatabildir [hata]'
};