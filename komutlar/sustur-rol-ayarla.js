const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/sRol.json", "utf8"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  let role = message.mentions.roles.first()
  
    if (!role) {
        return message.reply("Ayarlamak istediğin rolü etiketlemelisin!")
    }

    /*(!rol[message.guild.id]){
        rol[message.guild.id] = {
            susturRol: role.id
        };
    }
    fs.writeFile("././jsonlar/sRol.json", JSON.stringify(rol), (x) => {
        if (x) console.error(x)
      })*/
  
    db.set(`sRol_${message.guild.id}`, role.id)
  
    const embed = new Discord.RichEmbed()
    .setTitle(`» Susturma rolü başarıyla **${role.name}** olarak ayarlandı!`)
    .setColor("RANDOM")
    message.channel.send({embed})
}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sustur-rol', 'sustur-rol-belirle'],
    permLevel: 4,
    kategori: "moderasyon"
}

exports.help = {
    name: 'sustur-rol-ayarla',
    category: 'moderasyon',
    description: 'Birisi susturulunca verilecek rolü ayarlar.',
    usage: 'sustur-rol-ayarla <@rol>'
}