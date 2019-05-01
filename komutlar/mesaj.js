const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('mesaj').help.name
  var g = "Gösterilemiyor"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('mesaj').help.enname
        var g = "Cannot be displayed"
    }
    const dil = client[s]
    const o = a
  
  let x = message.channel.messages.get(args.slice(0).join(' '));
  if (!x) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  
  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(dil.msg.header)
  .addField(dil.msg.msg, x.content || g)
  .addField(dil.msg.id, x.id)
  .addField(dil.msg.sahip, x.author.tag)
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mesaj-ara', 'mesajara','alıntı'],
  permLevel: 0,
  kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'mesaj',
  description: 'IDini verdiğiniz mesaj hakkında bilgi verir. (IDi verilen mesaj komutun kullanıldığı kanalda yok ise mesajı bulamaz.)',
  usage: 'mesaj <mesaj ID>',
  enname: 'message',
  endescription: 'ID gives information about your message. (If the given message is not in the channel where the command is used, the message cannot be found.)',
  enusage: 'message <message ID>'
};