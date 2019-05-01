const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { randomRange, verify } = require('../util/Util.js');

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('düello').help.name
  var g = "⚔️ | Savaş"
  var m = "ne yapmak istersin? \`saldır\`, \`savun\`, \`ultra güç\` veya \`kaç\`?"
  var b = ['saldır', 'savun', 'ultra güç', 'kaç']
  var k = ['saldır', 'savun', 'ultra güç']
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('düello').help.enname
        var g = "⚔️ | Fight"
        var m = "what do you want to do? \`fight\`, \`defend\`, \`ultra power\` or \`escape\`?"
        var b = ['fight', 'defend', 'ultra power', 'escape']
        var k = ['fight', 'defend', 'ultra power']
    }
    const dil = client[s]
    const o = a
  
  this.fighting = new Set();
  
	let opponent = message.mentions.users.first()
	if (!opponent) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  
  if (opponent.bot) return message.reply(dil.nobot);
  if (opponent.id === message.author.id) return message.reply(dil.noyou);
		if (this.fighting.has(message.channel.id)) return message.reply(dil.savas.bir);
  
    let kalp = "💗";
    let kalp2 = "💗";
  
		this.fighting.add(message.channel.id);
		try {
			if (!opponent.bot) {
                await message.channel.send(dil.savas.istek.replace("{kisi}", opponent));
				const verification = await verify(message.channel, opponent);
				if (!verification) {
					this.fighting.delete(message.channel.id);
					return message.reply(dil.savas.reddedildi);
				}
			}
			let userHP = 500;
			let oppoHP = 500;
			let userTurn = false;
			let guard = false;
			const reset = (changeGuard = true) => {
				userTurn = !userTurn;
				if (changeGuard && guard) guard = false;
			};
			const dealDamage = damage => {
				if (userTurn) oppoHP -= damage;
				else userHP -= damage;
			};
			const forfeit = () => {
				if (userTurn) userHP = 0;
				else oppoHP = 0;
			};
			while (userHP > 0 && oppoHP > 0) { // eslint-disable-line no-unmodified-loop-condition
				const user = userTurn ? message.author : opponent;
				let choice;
				if (!opponent.bot || (opponent.bot && userTurn)) {
					await message.channel.send(/*dil.savas.secenek.replace("{kisi}", user).replace("{kisi2}", message.author.username).replace("{kisi3}", opponent.username).replace("{hp}", userHP).replace("{kalp}", kalp).replace("{hp2}", oppoHP).replace("{kalp2}", kalp2)) */stripIndents`
           ** ${g} **
						${user}, ${m}
						**${message.author.username}**: ${userHP} ${kalp}
						**${opponent.username}**: ${oppoHP} ${kalp2}
					`);
					const filter = res =>
						res.author.id === user.id && b.includes(res.content.toLowerCase());
					const turn = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30000
					});
					if (!turn.size) {
						await message.reply(dil.savas.zamandoldu);
						reset();
						continue;
					}
					choice = turn.first().content.toLowerCase();
				} else {
					const choices = k;
					choice = choices[Math.floor(Math.random() * choices.length)];
				}
				if (choice === 'saldır' || choice === 'fight') {
					const damage = Math.floor(Math.random() * (guard ? 10 : 100)) + 1;
					await message.channel.send(`${user}, **${damage}** ${dil.savas.hasar}!`);
					dealDamage(damage);
					reset();
				} else if (choice === 'savun' || choice === 'defend') {
					await message.channel.send(`${user}, ${dil.savas.savun}!`);
					guard = true;
					reset(false);
				} else if (choice === 'ultra güç' || choice === 'ultra power') {
					const miss = Math.floor(Math.random() * 7);
					if (!miss) {
						const damage = randomRange(100, guard ? 150 : 300);
						await message.channel.send(`${user}, ${dil.savas.ultra.replace("{hasar}", "**"+damage+"**")}`);
						dealDamage(damage);
					} else {
						await message.channel.send(`${user}, ${dil.savas.noultra}`);
					}
					reset();
				} else if (choice === 'kaç' || choice === 'escape') {
					await message.channel.send(`${user}, ${dil.savas.kac}`);
					forfeit();
					break;
				} else {
					await message.reply(dil.savas.anlamadim);
				}
        
        if (userHP < 300) {
          kalp = "❤️";
        }
        
        if (oppoHP < 300) {
          kalp2 = "❤️";
        }
        
        if (userHP < 200) {
          kalp = "💔";
        }
        
        if (oppoHP < 200) {
          kalp2 = "💔";
        }
        
			}
			this.fighting.delete(message.channel.id);
            const winner = userHP > oppoHP ? message.author : opponent;
			return message.channel.send(dil.savas.bitti.replace("{kazanan}", winner));

		} catch (err) {
			this.fighting.delete(message.channel.id);
			throw err;
		}
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['1vs1', '1v1', 'savaş', 'kapış', 'mücadele', 'teke-tek'],
  permLevel: 0,
    kategori: "eğlence",
  category: 'fun'
};

exports.help = {
  name: 'düello',
  description: 'İstediğiniz bir kişi eğlenceli ve zorlu bir kapışma yaparsınız!',
  usage: 'düello <@kullanıcı>',
  enname: 'fight',
  endescription: 'You fight with the person you want.',
  enusage: 'fight <@user>'
};