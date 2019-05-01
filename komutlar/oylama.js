const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('oylama').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('oylama').help.enname
    }
    const dil = client[s]
    const o = a
  
   const x = args.slice(0).join(' ');
  
    if (!x) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
    
    // Create Embed
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username} - ${dil.oylama.header}`)
        .addField(dil.oylama.miniheader, x)
        .addField(dil.oylama.yap, dil.oylama.msg)
        .setFooter(dil.oylama.zaman)
    let msg = await message.channel.send(embed)
        .then(function (msg) {
          db.set(`oylamaM_${message.guild.id}`, msg.id)
          msg.react("✅");
            msg.react("❌");
          setTimeout(function() {
            const e = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`${client.user.username} - ${dil.oylama.header}`)
            .addField(dil.oylama.miniheader, x)
            .addField(dil.oylama.sonuc, `** ${dil.oylama.kabul} (✅):** ${db.fetch(`oylamaE_${message.guild.id}`) || 0} \n** ${dil.oylama.hayır} (❌):** ${db.fetch(`oylamaH_${message.guild.id}`) || 0}`)
            .setFooter(dil.oylama.son)
            message.channel.send(e)
          }, 60000)
          
          setTimeout(function() {
            
          db.delete(`oylamaE_${message.guild.id}`)
          db.delete(`oylamaH_${message.guild.id}`)
          db.delete(`oylamaM_${message.guild.id}`)
            
          }, 65000)
          
            }).catch(function(error) {
            console.log(error);
        });
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["anket", "oylama-yap", "anket-aç"],
  permLevel: 4,
  kategori: "sunucu",
  category: "server"
};

exports.help = {
  name: 'oylama',
  description: 'Sunucunuzda oylama yapmanızı sağlar.',
  usage: 'oylama <mesaj>',
  enname: 'voting',
  endescription: 'Allows you to vote on your server.',
  enusage: 'voting <message>'
};