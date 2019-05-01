const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {
  message.delete()
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('davet').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('davet').help.enname
    }
    const dil = client[s]
    const o = a
  
  const davet = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`${client.user.username} - ${dil.special.links}`, client.user.avatarURL)
.setDescription(`[${dil.special.botinvite}](${client.ayarlar.botD}) \n[${dil.special.supportserver}](https://invite.gg/konya) \n [${dil.special.webS}](${client.ayarlar.webS}) \n[${dil.special.DBLpage}](${client.ayarlar.dbl}) \n[${dil.special.DBLvote}](${client.ayarlar.dblO})
`)
message.channel.send(davet)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['linkler'],
  permLevel: 0,
    kategori: "bot",
  category: "bot"
};

exports.help = {
  name: 'davet',
  description: 'Botun davet linklerini gösterir.',
  usage: 'davet',
  enname: 'invite',
  endescription: 'Bot shows invitation links.',
  enusage: 'invite'
};