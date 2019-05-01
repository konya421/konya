const Discord = require('discord.js');
const fs = require('fs');

//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message) => {
  
	//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('küfür-engelle').help.name
  var x = "Açık"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('küfür-engelle').help.enname
        var x = "On"
    }
    const dil = client[s]
    const o = a
  
	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	if(secenekler.length < 1) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o));
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);

  if (secenekler !== "aç" && secenekler !== "kapat" && secenekler !== "on" && secenekler !== "off") return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  
	if (secenekler === "aç" || secenekler === "on") {
    
    var i = db.set(`küfürE_${message.guild.id}`, "acik")
    
		message.channel.send(dil.basarili.replace("!", "") + `: ${i.replace("acik", x)}`)
    /*let kufurEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
 if(!kufurEngel[message.guild.id]){
		kufurEngel[message.guild.id] = {
			kufurEngel: "acik"
		  };
  };

		  fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (x) => {
        if (x) console.error(x)
      })*/

	};

	if (secenekler === "kapat" || secenekler === "off") {
    
    //var i = db.set(`küfürE_${message.guild.id}`, "kapali")
    
    db.delete(`küfürE_${message.guild.id}`)
    
		message.channel.send(dil.basarili)
  /*let kufurEngel = JSON.parse(fs.readFileSync("././jsonlar/kufurEngelle.json", "utf8"));
  if(!kufurEngel[message.guild.id]){
		kufurEngel[message.guild.id] = {
			kufurEngel: "kapali"
		  };
  };

		fs.writeFile("././jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (x) => {
        if (x) console.error(x)
      })
    
    if (kufurEngel[message.guild.id]) {
    delete kufurEngel[message.guild.id]
    delete kufurEngel[message.guild.id].kufurEngel
    }*/
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['küfür-engel'],
		permLevel: 4,
    kategori: "ayarlar",
    category: "settings"
	};
	  
	exports.help = {
		name: 'küfür-engelle',
		description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'küfür-engelle <aç/kapat>',
    enname: 'swearing-prevention',
    endescription: 'It allows you to turn the swearing blocking system on and off.',
    enusage: 'swearing-prevention <on/off>'
	};