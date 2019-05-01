const Discord = require('discord.js');
const Jimp = require('jimp');

exports.run = (bot, message, args) => {
  
  var user = message.mentions.users.first() || message.author;  
  if (!message.guild) user = message.author;

        //message.channel.send("⏲ | `Profil Fotoğrafınıza` **Göre Ayarlıyorum. Bu Biraz Zaman Alabilir**").then(m => m.delete(1000));

        Jimp.read(user.avatarURL, (err, image) => {
            image.resize(400, 400)  
            //image.greyscale()
            image.gaussian(1)
            Jimp.read("https://raw.githubusercontent.com/ASAli13/-mnbgsa/master/img/discord/discord12.png", (err, avatar) => {
                avatar.resize(400, 400)
                image.composite(avatar, 0, 0).write(`./x/${user.id}.png`);
                setTimeout(function() {
                    message.channel.send(new Discord.Attachment(`./x/${user.id}.png`));
                }, 1000);
            });

        });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dc"],
  permLevel: 0,
  kategori: "efekt",
  category: "effect"
};

exports.help = {
  name: 'discord',
  description: 'Avatarınıza Discord efekti verir. (Tüm HypeSquad çeşitlerinin renklerini içerir rengarenktir.)',
  usage: 'discord veya discord <@kullanıcı>',
  enname: 'discord',
  endescription: 'Gives your avatar Discord effect. (Contains all the colors of the HypeSquad varieties are colorful.)',
  enusage: 'discord or discord <@user>'
};
