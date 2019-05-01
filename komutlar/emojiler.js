const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('emojiler').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('emojiler').help.enname
    }
    const dil = client[s]
    const o = a
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription(`${message.guild.emojis.map(e=>e.toString()).join(" **|** ") ? message.guild.emojis.map(e=>e.toString()).join(" **|** ") : dil.dont}`)
  return message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "sunucu",
  category: 'server'
};

exports.help = {
  name: 'emojiler',
  description: 'Bulunduğunuz sunucudaki emojileri gösterir.',
  usage: 'emojiler',
  enname: 'emojis',
  endescription: 'It shows the emojis on the server you are on.',
  enusage: 'emojis'
};