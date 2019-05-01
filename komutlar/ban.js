 const Discord = require('discord.js');
const fs = require('fs');

exports.run = (client, message, args) => {
  message.delete()

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('yasakla').help.name
  var islem = "Yasaklama"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('yasakla').help.enname
        var islem = "Ban"
    }
    const dil = client[s]
    const o = a
    
  if (!message.guild.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return message.reply(dil.izin)
  //if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`);
  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  //let modLog = JSON.parse(fs.readFileSync("./jsonlar/mLog.json", "utf8"));
  if (db.has(`mLog_${message.guild.id}`) === false) return message.reply(dil.ayarlar.errors.mlogayarsiz);
  let modlog = message.guild.channels.get(db.fetch(`mLog_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  if (reason.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
  if (user.id === message.author.id) return message.reply(dil.noyou);
  /*if (user.highestRole.calculatedPosition > message.member.highestRole.calculatedPosition - 1) {
			return message.reply(`Bu kişinin senin rollerinden/rolünden daha yüksek rolleri/rolü var.`);
		}*/
  //if (!message.guild.member(user).bannable) return message.channel.send(`Bu kişiyi sunucudan yasaklayamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`);
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .addField(dil.modlog.islem, islem)
  .addField(dil.modlog.kisi, `${user.tag} (${user.id})`)
  .addField(dil.modlog.yetkili, `${message.author.username}#${message.author.discriminator}`)
  .addField(dil.modlog.sebep, "```" + reason + "```")
  modlog.send(embed);
  
   //if (!message.guild.member(user).bannable) return message.reply('Yetkilileri yasaklayamam!');
  message.guild.ban(user, 2);
  
  const embed2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`${dil.basarili}`)
  message.channel.send(embed2)
    
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3,
    kategori: "moderasyon",
  category: "moderation"
};

exports.help = {
  name: 'yasakla',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı> <sebep>',
  enname: 'ban',
  endescription: 'Bans the given user.',
  enusage: 'ban <@user> <reason>'
};