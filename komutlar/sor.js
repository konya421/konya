const Discord = require('discord.js');
const cleverbot = require("cleverbot.io");
const clever = new cleverbot("yRT2w1GqlMtezdq9", "RdmCkKfr0yfOTPMYS2CWpDysSSEWsENr");

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('sor').help.name
 var x = (`${client.emojis.get("498218338137407499")} Birazcık bekle düşünüyorum...`)
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('sor').help.enname
        var x = "Please wait ..."
    }
    const dil = client[s]
    const o = a
  
  var soru = args.slice(0).join(' ');
  if (soru.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  
  var m = await message.channel.send(x)
    clever.setNick("Yapay Zeka");
    clever.create(function(err, session) {
        clever.ask(soru, function(err, res) {
            return m.edit(`<@${message.author.id}>, ${res}`)
        });
    });
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['soru-sor'],
  permLevel: 0,
    kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'sor',
  description: 'Yapay zeka ile sorularınıza cevap verir.',
  usage: 'sor <soru>',
  enname: 'ask',
  endescription: 'It answers your questions with artificial intelligence.',
  enusage: 'ask <question>'
};
 