const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('giriş-mesaj-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('giriş-mesaj-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let gM = args.slice(0).join(' ');
  
    if (!gM) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!gMesaj[message.guild.id]){
        gMesaj[message.guild.id] = {
            gm: gM
        };
    }
    fs.writeFile("././jsonlar/girisM.json", JSON.stringify(gMesaj), (x) => {
        if (x) console.error(x)
      })*/
  
    var s = db.set(`girisM_${message.guild.id}`, gM)
  
    const embed = new Discord.RichEmbed()
    .setTitle(dil.basarili)
    .setDescription("```" + s + "```")
    .setColor("RANDOM")
    message.channel.send({embed})
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
  };

  exports.help = {
    name: 'giriş-mesaj-ayarla',
    description: 'Giriş mesajını değiştirmenizi sağlar.',
    usage: 'giriş-mesaj-ayarla <mesaj> \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}** yazınız aksi taktirde kişiyi göstermez.',
    enname: 'set-input-message',
    endescription: 'It allows you to change the login message.',
    enusage: 'set-input-message <message> \n**NOTE:** In the post, the person\'s future is **{user}** write, otherwise it will not show the person.'
  };