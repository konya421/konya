const Discord = require('discord.js');
const hastebin = require('hastebin-gen');

exports.run = async (client, message) => {
  
  const db = require('quick.db');
  
  var s = "tr"
  var x = "Tıkla!"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var x = "Click!"
    }
  const dil = client[s]
  
   hastebin(
     
client.guilds.sort((a,b)=>a.memberCount+b.memberCount).array().reverse().map(m => `❤️ ${m.name} ➡️➡️ ${m.members.size} Kullanıcı`).join(`\n\n`), "md").then(r => {
     var embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .setDescription(`${dil.basarili} \n**Link:** ${r}`)
     message.channel.send(embed);
  })

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-listesi'],
  permLevel: 0,
    kategori: "bot",
  category: "bot"
};

exports.help = {
  name: 'sunucular',
  description: 'Botun bulunduğu sunucuları gösterir.',
  usage: 'sunucular',
  enname: 'servers',
  endescription: 'Displays the servers where the bot is located.',
  enusage: 'servers'
};