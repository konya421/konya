const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('roller').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('roller').help.enname
    }
    const dil = client[s]
    const o = a
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`${message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') ? message.guild.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') : dil.dont}`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "sunucu",
  category: "server"
};

exports.help = {
  name: 'roller',
  description: 'Bulunduğunuz sunucudaki rolleri gösterir.',
  usage: 'roller',
  enname: 'roles',
  endescription: 'It shows the roles in the server you are in.',
  enusage: 'roles'
};