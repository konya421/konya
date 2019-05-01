const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('havadurumu').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('havadurumu').help.enname
    }
    const dil = client[s]
    const o = a
  
	if (!args[0]) {
		const embed = new Discord.RichEmbed()
			.setDescription(dil.argerror.replace("{komut}", o).replace("{prefix}", client.ayarlar.prefix))
			.setColor("RANDOM")
		message.channel.send({embed})
		return
	}

	const konum = args.join(" ")
	message.channel.send("", {
		files: [
			`http://wttr.in/${konum}_0tqp_lang=${s}.png`
		]
	})
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hava', 'hava-durumu', 'havabilgisi', 'hava-bilgisi', 'weather', 'weatherforecast'],
	permLevel: 0,
	kategori: 'kullanıcı'
}

exports.help = {
	name: 'havadurumu',
	description: 'Yazılan konumun hava durumu bilgisini gösterir.',
	usage: 'havadurumu <konum>',
  enname: 'weather',
  endescription: 'Shows the weather information of the written location.',
  enusage: 'weather <location>'
}