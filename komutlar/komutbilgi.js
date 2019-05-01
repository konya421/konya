const Discord = require('discord.js');
//const ayarlar = require('../ayarlar.json');
const { stripIndents, oneLine } = require('common-tags');
const db = require('quick.db');

exports.run = async (bot, message, args, dil) => {
  
  
  
  
  const ayarlar = bot.ayarlar
  
  var prefix = ayarlar.prefix
  
  /*if (message.author.id !== "441169716547944448") return message.reply("Bir süre devre dışıdır!")*/
  
  let command = args[0];
  
   if (!command) {
     
     if (message.channel.type !== 'dm') {
  const ozelmesajkontrol = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${bot.user.username} | Yardım`, bot.user.avatarURL)
  .setTitle(`Özel Mesajlarını Kontrol Et!`)
  .setDescription(`_Komutlarımı özel mesaj olarak gönderdim!_`);
  message.channel.send(ozelmesajkontrol) }
     
  if (db.has(`dil_${message.guild.id}`) === false) {
      
  const help = {}
		bot.commands.filter(c => c.help.name !== "dil-değiştir").filter(c => c.help.name !== "test").forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
      
      
			help[cat].push(`\`${command.help.name}\`: ${command.help.description}`);
		})
		var str = "```yaml\n"+bot.user.username+" - Komut Listesi\n``` \n[Bir komut hakkında ayrıntılı bilgi almak için `"+bot.ayarlar.prefix+"yardım <komut adı>` yazabilirsiniz. Örneğin; `"+bot.ayarlar.prefix+"yardım bilgi`]\n\n"
		for (const kategori in help) {
      var k = kategori
      .replace("eğlence", "eğlence komutları")
      .replace("kullanıcı", "kullanıcı komutları")
      .replace("sunucu", "sunucu komutları")
      .replace("profil", "profil sistemi")
      .replace("moderasyon", "moderasyon komutları")
      .replace("bot", "bot komutları")
      .replace("iletisim", "bot iletişim - destek komutları")
      .replace("yapımcı", "bot yapımcısı komutları")
      .replace("oyun", "oyun komutları")
      .replace("ayarlar", "ayarlar")
      .replace("özel", "özel komut sistemi")
      .replace("genel", "genel komutlar")
      .replace("efekt", "çerçeve ve efekt komutları")
      .replace("premium", "premium komutlar (Ücretsiz)")
      .replace("lvl", "Seviye Sistemi")
      
			str += `**${k.charAt(0).toUpperCase() + k.slice(1)}:** \n${help[kategori].join(" \n")}\n\n`
		}

  message.author.send(str+"**Müzik Komutları:** \n`oynat`: İstenilen şarkıyı oynatır. \n`tekrar`: Çalan şarkıyı bittiği zaman tekrar oynatır. \n`durdur`: Çalan şarkıyı durdurur. \n`duraklat`: Çalan şarkıyı duraklatır. \n`devamet`: Duraklatılmış şarkıyı devam ettirir. \n`ses`: Şarkının sesini ayarlar. \n`geç`: Sıradaki şarkıya geçer. \n`kuyruk`: Şarkı kuyruğunu ve çalan şarkıyı gösterir.", {split: true})
    
  }
  
     //ingilizce
     
  if (db.has(`dil_${message.guild.id}`) === true) {
    
    const help = {}
		bot.commands.filter(c => c.help.enname !== "set-language").filter(c => c.help.name !== "test").forEach((command) => {
			const cat = command.conf.kategori;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push(`\`${command.help.enname}\` ${command.help.endescription}`);
		})
		var str = "```yaml\n"+bot.user.username+" - Command List\n``` \n[Bir komut hakkında ayrıntılı bilgi almak için `"+bot.ayarlar.prefix+"yardım <komut adı>` yazabilirsiniz. Örneğin; `"+bot.ayarlar.prefix+"yardım bilgi`]\n\n"
		for (const kategori in help) {
      var k = kategori
      .replace("eğlence", "fun commands")
      .replace("kullanıcı", "user commands")
      .replace("sunucu", "server commands")
      .replace("profil", "profile system")
      .replace("moderasyon", "moderation commands")
      .replace("bot", "bot commands")
      .replace("iletisim", "bot contact - support commands")
      .replace("yapımcı", "bot owner commands")
      .replace("oyun", "game commands")
      .replace("ayarlar", "settings")
      .replace("özel", "special command system")
      .replace("genel", "general commands")
      .replace("efekt", "frame commands")
      .replace("lvl", "Level System")
      
			str += `**${k.charAt(0).toUpperCase() + k.slice(1)}:** \n${help[kategori].join(" \n")}\n\n`
		}

  message.author.send(str + "**Music Commands:** \n`oynat` | `tekrar` | `durdur` | `duraklat` | `devamet` | `ses` | `geç` | `kuyruk`", { split: true })
    
  }
  
return
}

  if (command) {
    
    if (bot.commands.has(command) ? bot.commands.has(command) : bot.aliases.has(command)) {
      var cmd = bot.commands.get(command) ? bot.commands.get(command) : bot.commands.get(bot.aliases.get(command))
      
  var s = 'tr'
  var komut = cmd.help.name
  var a = cmd.help.description
  var u = cmd.help.usage
  var k = cmd.conf.kategori
  var yetki = cmd.conf.permLevel.toString()
			.replace("0", `Yetki gerekmiyor.`)
			.replace("1", `Mesajları Yönet yetkisi gerekiyor.`)
			.replace("2", `Üyeleri At yetkisi gerekiyor.`)
      .replace("3", `Üyeleri Yasakla yetkisi gerekiyor.`)
			.replace("4", `Yönetici yetkisi gerekiyor.`)
			.replace("5", `Bot Sahibi yetkisi gerekiyor.`)
  
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var komut = cmd.help.enname
        var a = cmd.help.endescription
        var u = cmd.help.enusage
        var k = cmd.conf.category
        var yetki = cmd.conf.permLevel.toString()
			.replace("0", `No permission required.`)
			.replace("1", `Manage Messages permission is required.`)
			.replace("2", `Members Kick permission is required.`)
      .replace("3", `Members Ban permission is required.`)
			.replace("4", `Administrator permission is required.`)
			.replace("5", `Bot owner permission is required.`)
        
        }
      
			const embed = new Discord.RichEmbed()
				.addField(dil.yardım.komut, komut)
				.addField(dil.yardım.aciklama, a || dil.dont)//command.help.description || "Bulunmuyor")
        .addField(dil.yardım.kategori, k || dil.dont)//command.conf.kategori || "Bulunmuyor")
				.addField(dil.yardım.yetki, yetki || dil.unknow)
				.addField(dil.yardım.kullanim, u || dil.dont)//command.help.usage || "Bilinmiyor")
				.addField(dil.yardım.aliases, cmd.conf.aliases.join(', ') || dil.dont)
				.setColor("RANDOM")
			 message.channel.send({embed: embed})
      
		} else if (bot.english.has(command) ? bot.english.has(command) : bot.aliases.has(command)) {
      var cmd = bot.english.get(command) ? bot.english.get(command) : bot.commands.get(bot.aliases.get(command));
      
  var s = 'tr'
  var komut = cmd.help.name
  var a = cmd.help.description
  var u = cmd.help.usage
  var k = cmd.conf.kategori
  var yetki = cmd.conf.permLevel.toString()
			.replace("0", `Yetki gerekmiyor.`)
			.replace("1", `Mesajları Yönet yetkisi gerekiyor.`)
			.replace("2", `Üyeleri At yetkisi gerekiyor.`)
      .replace("3", `Üyeleri Yasakla yetkisi gerekiyor.`)
			.replace("4", `Yönetici yetkisi gerekiyor.`)
			.replace("5", `Bot Sahibi yetkisi gerekiyor.`)
  
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var komut = cmd.help.enname
        var a = cmd.help.endescription
        var u = cmd.help.enusage
        var k = cmd.conf.category
        var yetki = cmd.conf.permLevel.toString()
			.replace("0", `No permission required.`)
			.replace("1", `Manage Messages permission is required.`)
			.replace("2", `Members Kick permission is required.`)
      .replace("3", `Members Ban permission is required.`)
			.replace("4", `Administrator permission is required.`)
			.replace("5", `Bot owner permission is required.`)
        
    }
      
			const embed = new Discord.RichEmbed()
				.addField(dil.yardım.komut, komut)
				.addField(dil.yardım.aciklama, a || dil.dont)//command.help.description || "Bulunmuyor")
        .addField(dil.yardım.kategori, k || dil.dont)//command.conf.kategori || "Bulunmuyor")
				.addField(dil.yardım.yetki, yetki || dil.unknow)
				.addField(dil.yardım.kullanim, u || dil.dont)//command.help.usage || "Bilinmiyor")
				.addField(dil.yardım.aliases, cmd.conf.aliases.join(', ') || dil.dont)
				.setColor("RANDOM")
			 message.channel.send({embed: embed})
		} else {
			const embed = new Discord.RichEmbed()
				.setDescription(`Botta ${args[0]} isminde bir komut bulunamadı! Botun tüm komutlarını ${ayarlar.prefix}yardım yazarak öğrenebilirsiniz.`)
				.setColor("RANDOM")
			message.channel.send({embed})
    }
    return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  
  permLevel: 0,
  kategori: 'genel'
};

exports.help = {
  name: 'komutbilgi',
  category: 'genel',
  description: 'Tüm komutları listeler.',
  usage: 'yardım veya yardım <komut adı>'
};