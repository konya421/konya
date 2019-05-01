const Discord = require('discord.js');
const request = require('node-superfetch');
const db = require('quick.db');
const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
    
		const sorted = msg.guild.members.filter(u => !u.bot).array().sort((a, b) => { return (db.fetch(`seviye_${b.user.id + msg.guild.id}`) ? db.fetch(`seviye_${b.user.id + msg.guild.id}`) : 0) - (db.fetch(`seviye_${a.user.id + msg.guild.id}`) ? db.fetch(`seviye_${a.user.id + msg.guild.id}`) : 0) });
		const top10 = sorted.splice(0, 10)
		const mappedXp = top10.filter(o => !o.bot).map(s => db.fetch(`puancik_${s.user.id + msg.guild.id}`))
		const mappedLevel = top10.filter(o => !o.bot).map(s => db.fetch(`seviye_${s.user.id + msg.guild.id}`) || 0)
		const mappedName = top10.filter(o => !o.bot).map(s => s.user.tag);
		const mappedID = top10.filter(o => !o.bot).map(s => s.user.id);
		var str = ''
		for(var i = 0; i < 10; i++) {
			var xp = mappedXp[i]
			var lvl = mappedLevel[i]
      
			if(msg.author.id === mappedID[i]) {
				str += `[(Sen) ${i + 1}]: > ${mappedName[i]}\n # Seviye: ${lvl} | XP: ${xp || 0}\n\n`
			}
			if(msg.author.id !== mappedID[i]) {
				str += `[${i + 1}]: > ${mappedName[i]}\n # Seviye: ${lvl} | XP: ${xp || 0}\n\n`
			}
		}
		msg.channel.send(stripIndents`
\`\`\`markdown
${str}
\`\`\`
   `)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["leaderboard", "leadership"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'liderlik',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gösterir.',
  usage: 'liderlik'
};
