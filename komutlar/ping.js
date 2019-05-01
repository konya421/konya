const Discord = require('discord.js');
exports.run = async (client, msg, args) => { 
   msg.delete()
  let pingembed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setDescription(" Test Ediliyor......")
  .setTimestamp()
const message = msg
const m = await msg.channel.send(pingembed);
let embed = new Discord.RichEmbed()


  .setColor('RANDOM')
  .addField(`**Bot Gecikme Süresi **`, `***${Math.round(client.ping)}ms***`, true)
.setTimestamp()
.setThumbnail('https://i.ibb.co/sPsBHbS/yukleniyor.gif')
  .setAuthor(`${client.user.username} `, client.user.avatarURL)
  m.edit({ embed }).then(msg => msg.delete(15000));

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['gecikme', 'gecikme-süresi'],
  permLevel: 0,
  kategori: "genel",
  category: "general"
};

exports.help = {
  name: 'ping',
  description: 'Botun gecikme süresini gösterir.',
  usage: 'ping',
  enname: 'ping',
  endescription: 'The bot indicates the delay time.',
  enusage: 'ping'
};