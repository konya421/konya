const Discord = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');
require('moment-duration-format');

module.exports.run = async (client, msg, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('oyun-ara').help.name
    if(db.has(`dil_${msg.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('oyun-ara').help.enname
    }
    const dil = client[s]
    const o = a
  
    const aylar = dil.months
    
  const query = args.slice(0).join(' ');
  if (!query) return msg.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  
  if (query === "minecraft" || query === "mc" || query === "Minecraft" || query === "MC" || query === "Mc" || query === "MİNECRAFT" || query === "MINECRAFT" ) {
    try {
      
    var p = ["Android", "iOS", "XBOX ONE", "XBOX 360", "Raspberry Pi", "PlayStation 3", "PlayStation 4", "PlayStation Vita", "Nintendo Switch", "Windows Phone", "Amozon Device", "Windows", "Mac", "Linux"]
      
    const embed = new Discord.RichEmbed()
				.setColor("RANDOM")
				.setAuthor(`Minecraft - ${dil.steam.header}`, 'https://img00.deviantart.net/9cc9/i/2011/008/6/1/minecraft_hd_icon___mac___pc_by_hunterkharon-d36qrs5.png')
				.setURL(`http://minecraft.net/`)
				.setThumbnail('https://i.ytimg.com/vi/SQq6IDdBNGk/maxresdefault.jpg')
				.addField(dil.steam.fiyat, "[23,95 EUR](https://minecraft.net/tr-tr/?ref=m)")
				.addField(dil.steam.meta, "93" || dil.unknow)
				.addField(dil.steam.öner, dil.unknow)
				.addField(dil.steam.platform, p.join(', ') || dil.unknow)
				.addField(dil.steam.tarih, "16/06/2009" || dil.unknow)
				.addField(dil.steam.dlc, "0")
				.addField(dil.steam.developer, "Mojang Inc, Microsoft Corporation" || dil.unknow)
				.addField(dil.steam.publisher, "Microsoft Corporation" || dil.unknow);
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Bir Hata Oluştu! \n**Hata:** \n\`${err.message}\``);
    }
    return;
  }
  
  try {
			const id = await search(query);
			if (!id) return msg.reply(dil.dont);
			const data = await fetchGame(id);
			const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Ücretsiz';
			const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Ücretsiz';
			const price = current === original ? current : `~~${original}~~ ${current}`;
			const platforms = [];
			if (data.platforms) {
				if (data.platforms.windows) platforms.push('Windows');
				if (data.platforms.mac) platforms.push('Mac');
				if (data.platforms.linux) platforms.push('Linux');
			}
			const embed = new Discord.RichEmbed()
				.setColor("RANDOM")
				.setAuthor(`${data.name} - ${dil.steam.header}`, 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
				.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
				.setThumbnail(data.header_image)
				.addField(dil.steam.fiyat, price)
				.addField(dil.steam.meta, data.metacritic ? data.metacritic.score : dil.unknow)
				.addField(dil.steam.öner, data.recommendations ? data.recommendations.total : dil.unknow)
				.addField(dil.steam.platform, platforms.join(', ') || dil.unknow)
        .addField(dil.steam.tarih, data.release_date.date || dil.unknow)
				.addField(dil.steam.dlc, data.dlc ? data.dlc.length : "0")
				.addField(dil.steam.developer, data.developers ? data.developers.join(', ') || dil.unknow : dil.unknow)
				.addField(dil.steam.publisher, data.publishers ? data.publishers.join(', ') || dil.unknow : dil.unknow);
			return msg.channel.send(embed);
		} catch (err) {
			return msg.reply(`Bir Hata Oluştu! \n**Hata:** \n\`${err.message}\``);
    }
  
};

  async function search(query) {
    const { body } = await request
        .get('https://store.steampowered.com/api/storesearch')
        .query({
            cc: 'tr',
            l: 'tr',
            term: query
        });
    if (!body.items.length) return null;
    return body.items[0].id;
}

async function fetchGame(id) {
    const { body } = await request
        .get('https://store.steampowered.com/api/appdetails')
        .query({ appids: id });
    return body[id.toString()].data;
}

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["steammağaza", "steam-mağaza", "steamstore", "steam-store", "steam", "oyunara", "steamoyun", "steam-oyun"],
  permLevel: 0,
    kategori: "oyun",
  category: "game"
};

exports.help = {
  name: 'oyun-ara',
  description: 'Verilen oyun hakkında bilgi verir.',
  usage: 'oyun-ara <oyun adı>',
  enname: 'game-search',
  endescription: 'He searches the Steam Store and gives you information about the game you want.',
  enusage: 'game-search <game name>'
};