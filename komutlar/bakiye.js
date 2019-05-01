const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
    message.delete()

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('bakiye').help.name
  var h = "Bakiye Bilgisi"
  var b = "Bakiye:"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('bakiye').help.enname
        var h = "Balance Info"
        var b = "Balance:"
    }
    const dil = client[s]
    const o = a
  
  let para = JSON.parse(fs.readFileSync("././jsonlar/para.json", "utf8"));
 
  let user = message.mentions.users.first() || message.author
  
  if(!para[user.id]){
        para[user.id] = {
            rc: 5
        };
    }
  
  let rytCoin = para[user.id].rc;
  
  if (rytCoin < 1) return message.reply(dil.ekonomi.yok)
  
  var embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${user.username} - ${h}`, user.avatarURL)
  .addField(b, `${rytCoin} RE (RECoin)`)
  //.setFooter("Bakiye sistemi | Birim: Ryt Coin | Birim Kısaltma: RC", client.user.avatarURL)
  message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["para"],
  permLevel: 0,
    kategori: "profil",
  category: 'profile'
};

exports.help = {
  name: "bakiye",
  description: "Bakiyenizi gösterir.",
  usage: "bakiye veya bakiye <@kullanıcı>",
  enname: 'balance',
  endescription: 'Show your balance.',
  enusage: 'balance or balance <@user>'
};