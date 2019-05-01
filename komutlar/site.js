const Discord = require("discord.js")

exports.run = (client, message, args) => {
var embed = new Discord.RichEmbed()


.setTitle(`Sitenizin Linki Aşağıdadır`)
.setDescription("**https://konyabott.glitch.me**")
.setColor("#ff0a0a")
.setTimestamp()
message.channel.sendEmbed(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["web"],
  permLevel: 0,
  kategori: "genel",
};

exports.help = {
  name: 'site',
  description: 'Botun Sitesini Gösterir.',
  category: 'genel',
  usage: 'test'
};