const Discord = require('discord.js')
const fs = require('fs');
//var ayarlar = require('../ayarlar.json');
//let rol = JSON.parse(fs.readFileSync("././jsonlar/otoR.json", "utf8"));

exports.run = async (client, message, args) => {
//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('oto-rol-ayarla').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('oto-rol-ayarla').help.enname
    }
    const dil = client[s]
    const o = a
  
  let role = message.mentions.roles.first() //|| message.guild.roles.find(r => r.name === args.slice(0).join(' '));
  
    if (!role) {
        return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    }

    /*if(!rol[message.guild.id]){
        rol[message.guild.id] = {
            otoRol: role.id
        };
    }
    fs.writeFile("././jsonlar/otoR.json", JSON.stringify(rol), (x) => {
        if (x) console.error(x)
      })*/
  
     db.set(`otoR_${message.guild.id}`, role.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(`${dil.basarili}: **${role.name}**`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oto-rol', 'oto-rol-belirle'],
    permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
}

exports.help = {
    name: 'oto-rol-ayarla',
    description: 'Sunucuya birisi katıldıgında verilecek rolü ayarlar.',
    usage: 'oto-rol-ayarla <@rol>',
  enname: 'set-auto-role',
  endescription: 'The sets the role to be given when someone joins.',
  enusage: 'set-auto-role <@role>'
}