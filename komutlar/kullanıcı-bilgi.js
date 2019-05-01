const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

exports.run = async (client, message, args) => {
	let user = message.mentions.users.first() || message.author;
  //if (!user) return message.reply("Bir kullanıcıyı etiketleyiniz!")
	
  const db = require('quick.db'); 
  
  var s = 'tr'
  var a = client.commands.get('kullanıcı-bilgi').help.name
  var c = "Çevrimiçi"
  var cd = "Çevrimdışı"
  var b = "Boşta"//hirsiz
  var r = "Rahatsız Etmeyin"
  var y = "Evet"
  var n = "Hayır"
  var m = "Herhangi bir mesaj göndermemiş"
  var x = "Bu kullanıcı bir bottur bu yüzden son attığı mesaj gösterilemiyor"
  var oynuyor = "Oynuyor"
  var izliyor = "İzliyor"
  var dinliyor = "Dinliyor"
  var yayında = "YAYINDA"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('kullanıcı-bilgi').help.enname
        var c = "Online"
        var cd = "Offline"
        var b = "Idle"
        var r = "Do not distrub"
        var y = "Yes"
        var n = "No"
        var m = "Has not sent any messages"
        var x = "Bots message can not be shown"
        var oynuyor = "Playing"
        var izliyor = "Watching"
        var dinliyor = "Listening" //buralar nie böle xd bilmiyorm qnq komut şeyini db.push ilemi bahsediyon xd "no" o zaman help pls
       var yayında = "STREAMING"
    }
    const dil = client[s]
    const o = a
  
  const Durum = user.presence.status;
			const Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
			const durm = (Durum == "online" ? (client.emojis.get('516211158500245514') + c) : (Durum == "offline" ? (client.emojis.get('516211156495630336') + cd) : (Durum == "idle" ? (client.emojis.get('516211156067680279') + b) : (Durum == "dnd" ? (client.emojis.get('516211155619020805') + r) : (dil.dont)))))
      
    const aylar = dil.months
    
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
		.setColor(Durm)
		.setThumbnail(user.avatarURL || user.defaultAvatarURL)
    .setAuthor(`${user.username} - ${dil.kullanici.header}`)
		.addField(dil.kullanici.tag, `${user.tag}`)
		.addField(dil.kullanici.id, `${user.id}`)
    .addField(dil.kullanici.dckayit, `${moment(user.createdAt).format('DD')} ${aylar[moment(user.createdAt).format('MM')]} ${moment(user.createdAt).format('YYYY HH:mm:ss')}`)
		.addField(dil.kullanici.join, `${moment(user.joinedAt).format('DD')} ${aylar[moment(user.joinedAt).format('MM')]} ${moment(user.joinedAt).format('YYYY HH:mm:ss')}`)
		.addField(dil.kullanici.durm, `${durm || "Bilinmiyor"}`)
		//.addField("Durum Mesajı", oynuyor ? oynuyor : "Durum mesajı boş")//`${user.presence.game ? user.presence.game.name : 'Durum mesajı boş'}`)
    
    try {
    if (user.presence.game.type === 0) {
    embed.addField(dil.kullanici.durmmesaj, `${user.presence.game.name} ${oynuyor}` || dil.kullanici.bos)
    }
    if (user.presence.game.type === 3) {
    embed.addField(dil.kullanici.durmmesaj, `${user.presence.game.name} ${izliyor}` || dil.kullanici.bos)
    }
    if (user.presence.game.type === 2) {
    embed.addField(dil.kullanici.durmmesaj, `${user.presence.game.name} ${dinliyor}` || dil.kullanici.bos)
    }
    if (user.presence.game.type === 1) { 
    embed.addField(dil.kullanici.durmmesaj, `[${user.presence.game.name} ${yayında}](${user.presence.game.url})` || dil.kullanici.bos)
    }
    } catch(e) {
      embed.addField(dil.kullanici.durmmesaj, dil.kullanici.bos)
    }
    embed.addField(dil.kullanici.botmu, `${user.bot ? y : n}`)
		.addField(dil.kullanici.roles, `${member.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') ? member.roles.filter(r => r.name !== "@everyone").map(r => r).join(' **|** ') : dil.dont}`)
  
   var son = "evet"
   try {
     
   if (!message.guild.members.get(user.id).lastMessage.embeds[0] || !message.guild.members.get(user.id).lastMessage.edits[1]) { 
      var son = user.lastMessage
    }
    
    if (message.guild.members.get(user.id).lastMessage.embeds[0]) { 
      var son = `**${message.guild.members.get(user.id).lastMessage.embeds[0].author.name}** başlıklı bir embed yollamış.`
   }
     
    if (message.guild.members.get(user.id).lastMessage.edits[1].content) {
      var son = `**${message.guild.members.get(user.id).lastMessage.edits[1].content}** yazan bir mesaj göndermiş ama mesajı **${message.guild.members.get(user.id).lastMessage.edits[0].content}** olarak düzenlemiş.`
    }
    
  
   } catch(e) {
     var son = "Herhangi bir mesaj göndermemiş"
   }
                                                                
    embed.addField(dil.kullanici.sonmsg, son ? son : m)
    message.channel.send({embed});
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı'],
  permLevel: 0,
    kategori: "kullanıcı",
  category: "user"
};

exports.help = {
  name: 'kullanıcı-bilgi',
  category: "kullanıcı",
  description: 'İstediğiniz kullanıcı veya komutu kullanan kullanıcı hakkında bilgi verir.',
  usage: 'kullanıcı-bilgi or kullanıcı-bilgi <@kullanıcı>',
  enname: 'user',
  endescription: 'It gives information about the user you want or the user who uses the command.',
  enusage: 'user or user <@user>'
};