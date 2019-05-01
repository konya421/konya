const Discord = require("discord.js");
const client = new Discord.Client();
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1OTcyMDE0OTE3NTg5NDAzOCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTU1NTIzMzQ3fQ.wqJedTA7AxMdLP7U4BD8saRsKgMyOKNLM499wcH9a7I', client);
exports.run = (client, message) => {
    dbl.hasVoted(message.author.id).then(voted => {
        if (!voted) {
            message.reply("Bu komutu kullanabilmek için DBL üzerinden oy vermen gerekiyor. (Eğer oy verdiyseniz bi kaç dakika bekleyin .s) \nOy vermek için: https://discordbots.org/bot/559720149175894038/vote")

        } else {
            message.channel.send("UpVote rolün verildi.");
            message.member.addRole("568155784660385792")

        }
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["upvote", "oyverdim"],
  permLevel: 0,
    kategori: "kullanıcı"
};

exports.help = {
  name: 'oyver',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar <@kişi-etiket> <sebep>'
};