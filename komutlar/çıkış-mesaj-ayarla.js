const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let cMesaj = JSON.parse(fs.readFileSync("././jsonlar/cikisM.json", "utf8"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
   const db = require('quick.db');
  
      var s = 'tr'
  var a = client.commands.get('çıkış-mesaj-ayarla').help.name

    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('çıkış-mesaj-ayarla').help.enname
     
    }
    const dil = client[s]
  
  
  let cM = args.slice(0).join(' ');
  
    if (!cM) {
        return message.reply("Çıkış mesajı ayarlamak istediğiniz mesajı yazmalısınız!")
    }

    /*if(!cMesaj[message.guild.id]){
        cMesaj[message.guild.id] = {
            cm: cM
        };
    }
    fs.writeFile("././jsonlar/cikisM.json", JSON.stringify(cMesaj), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`cikisM_${message.guild.id}`, cM)
  
    const embed = new Discord.RichEmbed()
    .setTitle(`» Çıkış Mesajı Değiştirildi!`)
    .addField(`Ayarlanan Mesaj`, "```" + cM + "```")
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
    name: 'çıkış-mesaj-ayarla',
    
    description: 'Çıkış mesajını değiştirmenizi sağlar.',
    usage: 'çıkış-mesaj-ayarla <mesaj> \n**NOT:** Mesajda kişinin geleceği yere **{kullanıcı}** yazınız aksi taktirde kişiyi göstermez.',
    enname: 'change-output-message',
    enusage: 'change-output-message <new message>',
    endescription: 'change-output-message **NOTE:** The future of the person in the message place **{user}** aksi halde kişi göstermeyecektir.',



  };
  