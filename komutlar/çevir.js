const Discord = require('discord.js');
var cevir = require('node-google-translate-skidz');

exports.run = (client, message, args) => {
     const db = require('quick.db');
    var s = 'tr'
  var a = client.commands.get('çevir').help.name

    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('çevir').help.enname
     
    }
    const dil = client[s]
  
  
  const oncekidil = args[0];
  const dill = args[1];
  const yazi = args.slice(2).join(' ');
  
  if (!oncekidil) return message.reply("Hangi dili çevireceğinizi yazınız!")
  if (!dill) return message.reply("Çevrilecek dili yazınız!")
  if (yazi.length < 1) return message.reply("Çevireceğiniz yazıyı yazınız!")
  
  cevir({
                text: yazi,
                source: oncekidil,
                target: dill
            }, function(result) {
                var dl = result.translation
                const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`${oncekidil} dilinden ${dil} diline çevrildi!`)
                .addField("Çevrilmek İstenen Metin", yazi)
                .addField("Çevrilen Metin", dl)
                .setFooter(`Çeviren Kullanıcı: ${message.author.tag}`, message.author.avatarURL)
                 message.channel.send({embed})
                    .catch(error => message.channel.send(`Bir Hata Oluştu! \n**Hata:** \n${error}`))
            });
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["çeviri", "translate"],
  permLevel: 0,
  kategori: "kullanıcı",
  category: "user"
};

exports.help = {
  name: 'çevir',
  category: 'kullanıcı',
  description: 'İstediğiniz yazıyı istediğiniz dile çevirir.',
  usage: 'çevir <yazının-dili> <çevrilecek-dil> <çevrilmek istenen yazı>',
  enname: 'translate',
  enusage: 'translate <message language> <language> <message>',
  endescription: 'bot translates the article you want for you'
  
};