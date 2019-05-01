const Discord = require("discord.js"); 
const client = new Discord.Client();
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(client, message, args) => {
  message.delete()
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(client.user.avatarURL)
    .setTitle('<a:serit:559815474607816718> Konya Bot :bar_chart:')
    .addField(':timer: Gecikme: ', client.ping + 'ms')
    .addField(':headphones: Müzik Çalınan Sunucu Sayısı;', client.voiceConnections.size, true)
    .addField(':construction_worker: Çalışma Süresi: ', `${duration}`, true)
    .addField(':busts_in_silhouette: Kullanıcılar:', client.guilds.reduce((a, b) => a + b.memberCount, 0), true)
    .addField(':tv: Kanallar:', client.channels.size, true)
    .addField(':clipboard: Sunucular:', client.guilds.size, true)
    .addField(':desktop: Bellek kullanımı:', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2), true)
    .addField(':book: Kütüphanesi;', `Discord.js`, true)
    .addField(`Discord.js sürümü:`, Discord.version, true)
      .addField(':spy: Yapımcım:', '<@530713851675672587> \n `Konya`', false)
      .addField(':paperclip: Botun Başlanma Zamanı:', "Bot **10.04.2018**'de yapılmaya başlanmıştır", true)
    .setFooter('Konya Bot | Her Hakkı Saklıdır..', client.user.avatarURL)
    .setTimestamp()
    message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['i'],
    permLevel: 0,
    kategori: "bot",
  category: "bot"
  };
  
  exports.help = {
    name: 'istatistik',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik',
    enname: 'stat',
    endescription: 'Displays the bot statistics.',
    enusage: 'stat'
  };