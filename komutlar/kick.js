const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('at').help.name
  var islem = "Atma"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('at').help.enname
        var islem = "Kick"
    }
    const dil = client[s]
    const o = a
  
  if (!message.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS")) return message.reply(dil.izin)
  //if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.mlogayarsiz);
  let modlog = message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  if (reason.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  if (user.id === message.author.id) return message.reply(dil.noyou);
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  //if (!message.guild.member(user).kickable) return message.channel.send(`Bu kişiyi sunucudan atamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField(dil.modlog.islem, islem)
  .addField(dil.modlog.kisi, `${user.tag} (${user.id})`)
  .addField(dil.modlog.yetkili, `${message.author.username}#${message.author.discriminator}`)
  .addField(dil.modlog.sebep, "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.member(user).kick();
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`${dil.basarili}`)
  message.channel.send(embed2)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
    kategori: "moderasyon",
  category: "moderation"
};

exports.help = {
  name: 'at',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'at <@kullanıcı> <sebep>',
  enname: 'kick',
  endescription: 'Kick the given user.',
  enusage: 'kick <@user> <reason>'
};