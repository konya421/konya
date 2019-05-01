const Discord = require('discord.js');
const { stripIndents, oneLine } = require('common-tags');
const moment = require('moment');
const db = require('quick.db');
const useful = require('useful-tools');

exports.run = async (client, message) => {
    message.delete()

  const ayarlar = client.ayarlar
  
  const bot = await client.fetchApplication()

  var s = 'tr'
  var h = 've'
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var h = 'and'
    }
  const dil = s
  
    
  const aylar = client[dil].months
  
  var helpers = client[dil].wait

	if(ayarlar.yardimcilar[0]) {
  var helpers = ''
		for (var i = 0; i < ayarlar.yardimcilar.length; i++) {
			var şuanki = client.users.get(ayarlar.yardimcilar[i]).tag;
			if (i === 0) {
				helpers += şuanki
			}
			else if (i === ayarlar.yardimcilar.length - 1) {
				helpers += ` ${h} ${şuanki}`;
			} else {
				helpers += ", " + şuanki
			}
		}
  }
  
    const embed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.addField(client[dil].bilgi.owner, client.users.get(client.ayarlar.official_sahip).tag (client.ayarlar.sahip2).tag, true)
    .addField(client[dil].bilgi.helpers, helpers, true)
    .addField(client[dil].created, useful.tarih(client.user.createdAt), false)
    .addField(client[dil].bilgi.cmds, client.commands.size, true)
    .addField(client[dil].bilgi.prefix, `${ayarlar.prefix}`, true)
    .addField(client[dil].bilgi.version, `${ayarlar.versiyon}`, true)
    .addField(client[dil].desteksistem.baslik.replace("{bot}", client.user.username), `**1 -** \`${client.ayarlar.prefix}destek-kanal-ayarla\` yazarak bir Destek Kanalı ayarlayın! \n**2 -** \`${client.ayarlar.prefix}destek-rol-ayarla\` yazarak bir Destek Rolü ayarlayın!`)
	.addField(client[dil].special.links, `[Web Paneli](${client.ayarlar.web}) \n[${client[dil].special.botinvite}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958847) \n[${client[dil].special.supportserver}](https://discord.gg/NjwraQr) \n[${client[dil].special.DBLpage}](https://discordbots.org/bot/510881654949019652) \n[${client[dil].special.DBLvote}](https://discordbots.org/bot/510881654949019652/vote)`)
  .setFooter(`©${(new Date()).getFullYear()} - ${client.user.username} Tüm hakları saklıdır.`, client.user.avatarURL)
  message.channel.send({embed});
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hakkında'],
    permLevel: 0,
    kategori: "bot",
    category: "bot"
  };
  
  exports.help = {
    name: 'bilgi',
    description: 'Bot hakkında bilgi verir.',
    usage: 'bilgi',
    enname: 'info',
    endescription: 'It gives information about the bot.',
    enusage: 'info'
  };