const Discord = require('discord.js')
const fs = require('fs')
//const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('sayaç-ayarla').help.name
  var x = "Lütfen sunucu sayısından daha yüksek bir değer girin!"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('sayaç-ayarla').help.enname
        var x = "Please enter a higher value than the server number!"
    }
    const dil = client[s]
    const o = a
  
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  
	if(!args[0]) {
		return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
	}

	//let profil = JSON.parse(fs.readFileSync("./jsonlar/sayac.json", "utf8"));

	if(isNaN(args[0])) {
		return message.reply(dil.number)
	}

	if(args[0] <= message.guild.members.size) {
		const embed = new Discord.RichEmbed()
		return message.reply(x)
	}

	/*if(!profil[message.guild.id]){
		profil[message.guild.id] = {
			sayi: args[0]
		};
	}
	
	//profil[message.guild.id].sayi = args[0]
	
	fs.writeFile("./jsonlar/sayac.json", JSON.stringify(profil), (x) => {
        if (x) console.error(x)
      })*/
  
  db.set(`sayac_${message.guild.id}`, args[0])
  
	const embed = new Discord.RichEmbed()
	.setTitle(`${dil.basarili}: **${args[0]}**`)
	message.channel.send({embed})
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['sayacayarla', 'sayac', 'sayaç'],
	permLevel: 4,
    kategori: "ayarlar",
  category: "settings"
}

exports.help = {
	name: 'sayaç-ayarla',
	description: 'Sayacı ayarlar.',
	usage: 'saya-çayarla <sayı>',
  enname: 'set-counter',
  endescription: 'Sets counter.',
  enusage: 'set-counter <number>'
}