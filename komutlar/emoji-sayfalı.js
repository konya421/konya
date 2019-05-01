const Discord = require("discord.js");
module.exports.run = async (bot, message) => {
      message.delete(5000)

	var emojis = message.guild.emojis.array();
	if (!emojis || emojis === []) return message.reply("Sunucuya hiç emoji eklenmemiş!");
	if (emojis.length > 1) {
		var page = 1;
		var totalpages = emojis.length;
		var embed = new Discord.RichEmbed()
			.setTitle("Konya Bot - Sunucuya Eklenen Emojiler")
			.setDescription(` Emoji Adı:[ :${emojis[page - 1].name}: ]`)
			.setImage(emojis[page - 1].url)
			.setFooter(`Sayfa ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)
			.setColor('RANDOM');
		message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["◀", "▶"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			await sentEmbed.react(emojiArray[1]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 300000
			});
			reactions.on("collect", async function (reaction) {
				await reaction.remove(message.author);
				if (reaction.emoji.name === "◀") {
					if (page !== 1) {
						page = page - 1;
					} else {
						page = totalpages;
					}
				} else {
					if (page !== totalpages) {
						page = page + 1;
					} else {
						page = 1;
					}
				}
				embed = new Discord.RichEmbed()
					.setTitle("Konya Bot - Sunucuya Eklenen Emojiler")
					.setDescription(` Emoji Adı:[ :${emojis[page - 1].name}: ]`)
					.setImage(emojis[page - 1].url)
					.setFooter(`Sayfa ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)
					.setColor('RANDOM');
				sentEmbed.edit(embed).catch(function () { });
			});
			reactions.on("end", () => sentEmbed.edit("Etkileşimli komut sona erdi: 5 dakika geçti."));
		}).catch(() => {
			message.reply("Bu embed'i göndermeye çalışırken bir hata oluştu.").catch(() => {
				message.author.send(`Komut zaten çalışmakta ${message.channel}`).catch(function () { });
			});
		});
	} else {
		let emojiembed = new Discord.RichEmbed()
			.setTitle("Sunucuya Eklenen Emojiler")
			.setDescription(` Emoji Adı:[ :${emojis[0].name}: ]`)
			.setImage(emojis[0].url)
			.setFooter(`Sayfa ${1}/${1} | Emoji ID: ${emojis[0].id}`)
			.setColor('RANDOM');
		message.channel.send(emojiembed);
	}
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
      kategori: "sunucu",

};

module.exports.help = {
  name: 'emoji',
  kategori: "genel",
  description: 'Sayfalı emojiler',
  usage: 'emoji'
};