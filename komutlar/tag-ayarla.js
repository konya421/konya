const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('tag-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('tag-ayarla').help.enname
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
  
    var s = db.set(`tagB_${message.guild.id}`, gM)
  
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
    name: 'tag-ayarla',
   
    description: 'Sunucuya katılan üyeye otomatik tag verir',
    usage: 'tag-ayarla <tag>',
    
      enname: 'set-tag',
  endescription: 'automatic tag to the member joining the server',
  enusage: 'set-tag <tag>'
  };