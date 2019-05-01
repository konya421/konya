var request = require('request');
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  message.delete()
request('https://simsekapi.glitch.me/ataturk', function (error, response, body) {
    if (error) return message.channel.send('Hata:', error);
    else if (!error) {
        var genel = JSON.parse(body);
       let e = new Discord.RichEmbed()
      .setColor("RANDOM")
     .setImage(genel.ataturk)
        message.channel.send(e);
    }
});
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'atatürk',
  description: 'Atatürk\'ün rastgele bir resmini atar.',
  usage: 'atatürk',
  enname: 'atatürk',
};