const Discord = require('discord.js');
const db = require("quick.db");

exports.run = (client, message, args, dil, dill) => {
    message.delete()  
      let sebep = args.slice(0).join(" ");
      if (!sebep) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", message.content.slice(2)));

      db.set(`afks_${message.author.id}`, sebep)
  
  if (dill === "tr") {
    message.reply(`artık **${sebep}** sebebi ile AFK modundasın!`)
  }
  
  if (dill === "en") {
    message.reply(`You are in AFK mode now! Reason: **${sebep}**`)
  }
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
    kategori: "kullanıcı",
  category: "user"
  //aktifmi: false
};

exports.help = {
  name: 'afk',
  description: 'AFK olursunuz. (Birisi sizi etiketlediğinde AFK olduğunuzu söyler.)',
  usage: 'afk <sebep>',
  enname: 'afk',
  endescription: 'You will be AFK. (Someone says you\'re AFK when you tag it.)',
  enusage: 'afk <reason>'
};
