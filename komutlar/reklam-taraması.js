const Discord = require('discord.js')
//const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  //if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('reklam-taraması').help.name
  var x = "Oynuyor Mesajı Reklam İçeren Kullanıcılar"
  var k = "Kullanıcı Adı Reklam İçeren Kullanıcılar"
  var y = "Kimsenin Oynuyor Mesajı Reklam İçermiyor"
  var b = "Kimsenin kullanıcı adı reklam içermiyor."
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('reklam-taraması').help.enname
        var x = "Users playing advertisement"
        var k = "Users with username ad"
        var y = "No ads!"
        var b = "No ads!"
    }
    const dil = client[s]
    const o = a
  
	const members = message.guild.members.filter(member => member.user.presence.game && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.presence.game.name));
	const memberss = message.guild.members.filter(member => member.user.username && /(discord|http|.com|.net|.org|invite|İnstagram|Facebook|watch|Youtube|youtube|facebook|instagram)/g.test(member.user.username));
	const embed = new Discord.RichEmbed()
		.addField(x, members.map(member => `${member} = ${member.user.presence.game.name}`).join("\n") || y)
		.addField(k, memberss.map(member => `${member} = ${member.user.username}`).join("\n") || b)
		.setColor("RANDOM")
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['reklam-ara', 'reklamara', 'reklamtaraması'],
	permLevel: 1,
    kategori: "moderasyon",
  category: "moderation"
}

exports.help = {
	name: 'reklam-taraması',
	description: 'Kullanıcıların oynuyor mesajlarındaki ve kullanıcı adlarındaki reklamları tarar.',
	usage: 'reklam-taraması',
  enname: 'ad-crawl',
  endescription: 'The ads in the User\'s Playing message and User names are scanned.',
  enusage: 'ad-crawl'
}
