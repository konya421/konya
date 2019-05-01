const Discord = require('discord.js')
const os = require('os')
var speedTest = require('speedtest-net');

exports.run = async (client, message, args) => {
  

   const embed = new Discord.RichEmbed()
   .setAuthor('Konya Bot | Speed Test ')
   .setDescription(' Gerekli Veriler Hesaplanıyor...')
   .setTimestamp()
   .setColor("RANDOM")
   message.channel.send(embed) .then(msg => msg.delete(7500));

 
  var osType = os.type();

  if (osType === 'Darwin') osType = 'macOS'
  else if (osType === 'Windows') osType = 'Windows'
  else if (osType === 'Linux') osType = 'Linux'
  else if (osType === 'Ubuntu') osType = 'Ubuntu'
  else osType = os.type();
    var test = speedTest({maxTime: 1000});
    test.on('data', data => {
const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
.setAuthor('Speed Test | Sonuçlar')
.addField('Anlık İstatistikler', `İndirme: **${data.speeds.download}**
Yükleme: **${data.speeds.upload}**`)
.addField('Normal Olarak Ölçülen İstatistikler', `İndirme: **${data.speeds.originalDownload}**
Yükleme: **${data.speeds.originalUpload}**`)
.addField('Pingler', `Discord API Pingi: **${client.ping}**
Speedtestde Ölçülen Ping: **${data.server.ping}**`)

  return message.channel.send(embed)
});
 
    test.on('error', err => {
  console.log(err);
});
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 5,
  kategori: "yapımcı"
};

exports.help = {
  name: 'speedtest',
  description: 'speedtest',
  usage: 'speedtest'
};