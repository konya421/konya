const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents



exports.run = function(client, message, args) {
  
    const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('hesapla').help.name
  var i = "Sonsuz"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('hesapla').help.enname
        var i = "Infinity"
    }
    const dil = client[s]
    const o = a
  
    var soru = args.join(' ');
    
    if(!soru) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    else { 
      let cevap;
        try {
            cevap = math.eval(soru)
        } catch(err) {
            message.channel.send(dil.unknow)
        }
      
        /*const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField('İşlem', soru ? soru : "İşlem Bulunamadı")
        .addField('Sonuç', cevap ? cevap.toString().replace("Infinity", "Sonsuz") : "Hesaplanamadı")*/
        message.channel.send(`**${soru.replace("-", " - ").replace("+", " + ").replace("/", " / ").replace("*", " * ")} = ${cevap.toString().replace("Infinity", i) || dil.unknow}**`)
    }


};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ["matematik"],
  permLevel: 0,
    kategori: "kullanıcı",
  category: "user"
};

exports.help = {
  name: 'hesapla',
  category: "kullanıcı",
  description: 'Belirtilen işlemi yapar.',
  usage: 'hesapla <işlem>',
  enname: 'calculate',
  endescription: 'Makes the specified operation.',
  enusage: 'calculate <operation>'
};