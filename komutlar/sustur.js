const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ms = require("ms");

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('konuştur').help.name
  var islem = "Susturma Kaldırma"
  var x = "Bu kişi susturulmamış!"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('konuştur').help.enname
        var islem = "Unmute"
        var x = "This person is not mute!"
    }
    const dil = client[s]
    const o = a
  
  if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.reply(`Yeterli izinlere sahip değilim! \n**İhtiyacım Olan Yetki:** \n\`Rolleri Yönet\``)
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let sure = args.slice(1).join(' ');
  //let reason = args.slice(2).join(' ');
  if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.mlogayarsiz);
  let modlog = message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (db.has(`sRol_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.srolayarsiz);
  let muteRole = message.guild.roles.get(db.fetch(`sRol_${message.guild.id}`));
  if (message.mentions.users.size < 1) return message.reply('Susturacağın kişiyi etiketlemelisin!');
  if (sure.length < 1 && !sure) return message.reply('Ne kadar süre susturacağını yazmadın! \n\n**NOT:** Örnek olarak 1 minute şeklinde yazınız. \nSüreyi ingilizce yazmanız gerekmektedir! \n\nGenelde susturmada çok kullanılan süreler: \n\nminute = dakika \nsecond = saniye \nhour = saat')
  //if (reason.length < 1) return message.reply('Susturma sebebini yazmadın!');
  if (user.id === message.author.id) return message.reply('Kendini susturamazsın!');
  if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}
  if (message.guild.member(user).roles.has(muteRole)) return message.reply('Bu kişi zaten susturulmuş!');
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Susturma')
  .addField('Susturulan Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Susturan Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Susturulma Süresi', sure.toString().replace(/(minutes|minute|min|m)/, 'dakika').replace(/(seconds|second|sec|s)/, 'saniye').replace(/(hours|hour|h)/, 'saat'))
  // .addField('Susturma Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.channels.forEach(async (channel, id) => {
        message.channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });

  await(message.guild.members.get(user.id).addRole(muteRole))
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`<@${user.id}> adlı kullanıcı başarıyla susturuldu!`)
  .addField("Susturulma Süresi", sure.toString().replace(/(minute|min|m)/, 'dakika').replace(/(seconds|second|sec|s)/, 'saniye').replace(/(hours|hour|h)/, 'saat'))
  message.channel.send(embed2)
  
  setTimeout(function() {
    message.guild.members.get(user.id).removeRole(muteRole)
    message.channel.send(`<@${user.id}> kullanıcısının susturulma süresi bitti ve susturulması kaldırıldı!`);
  }, ms(sure));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 1,
    kategori: "moderasyon"
};

exports.help = {
  name: 'sustur',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi susturur.',
  usage: 'sustur <@kişi-etiket> <sebep>'
};