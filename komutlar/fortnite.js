const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

exports.run = (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('fortnite').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('fortnite').help.enname
    }
    const dil = client[s]
    const o = a
  
    if(args.length < 1){
        message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
        return;
    }

  var name = args.slice(0).join(' ');
  
    var url = "https://fortnitetracker.com/profile/pc"
                                + encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if(err){
            message.reply(dil.dont);
            message.channel.stopTyping();
            return;
        }
      
        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "", url)
            .setDescription('')
            .addField(dil.fortnite.maclar, result.wins)
            .addField(dil.fortnite.oyun, result.matches)
            .addField(dil.fortnite.oran, ~~result.wr + "%")
            .addField(dil.fortnite.kill, + result.kills)
            .addField(dil.fortnite.kd, + result.kd)
            .setColor("RANDOM")
            .setURL(url)
            .setThumbnail(result.skinUrl);

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fortnite-istatistik'],
  permLevel: 0,
    kategori: "oyun",
  category: "game"
};

exports.help = {
  name: 'fortnite',
  description: 'İstediğiniz bir fortnite kullanıcısının istatistiklerini gösterir.',
  usage: 'fortnite pc <kullanıcı adı>',
  enname: 'fortnite',
  endescription: 'It shows the statistics of a fortnite user you want.',
  enusage: 'fortnite pc <user name>'
};
