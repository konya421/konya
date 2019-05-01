const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {

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
  
  if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES")) return message.reply(dil.izin)
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.mlogayarsiz);
  let modlog = message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (db.has(`sRol_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.srolayarsiz);
  let muteRole = message.guild.roles.get(db.fetch(`sRol_${message.guild.id}`));
  if (message.mentions.users.size < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  if (user.id === message.author.id) return message.reply(dil.noyou);
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  if (!message.guild.member(user).roles.has(muteRole.id)) return message.reply(x);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField(dil.modlog.islem, islem)
  .addField(dil.modlog.kisi, `${user.tag} (${user.id})`)
  .addField(dil.modlog.yetkili, `${message.author.username}#${message.author.discriminator}`)
  modlog.send(embed);
  
  message.guild.members.get(user.id).removeRole(muteRole)
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`${dil.basarili}`)
  message.channel.send(embed2)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur-kaldır"],
  permLevel: 1,
    kategori: "moderasyon",
  category: "moderation"
};

exports.help = {
  name: 'konuştur',
  description: 'Susturulmuş bir kişinin susturmasını kaldırmayı sağlar.',
  usage: 'konuştur <@kullanıcı>',
  enname: 'unmute',
  endescription: 'Allows a silenced person to lift the silence.',
  enusage: 'unmute <@user>'
};