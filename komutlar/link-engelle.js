const Discord = require('discord.js');
const fs = require('fs');

//var ayarlar = require('../ayarlar.json');

exports.run = async (client, message) => {
  
	//if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('link-engelle').help.name
  var x = "Açık"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('link-engelle').help.enname
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
		
    var i = db.set(`linkE_${message.guild.id}`, "acik")
    
		message.channel.send(dil.basarili.replace("!", "") + `: ${i.replace("acik", x)}`)
    
    /*let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));
  if(!linkEngel[message.guild.id]){
		linkEngel[message.guild.id] = {
			linkEngel: "acik"
		  };
  };

		  fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (x) => {
        if (x) console.error(x)
      })
    */
	};

	if (secenekler === "kapat") {
    
    db.delete(`linkE_${message.guild.id}`)
    
		message.channel.send(dil.basarili)
    
    /*let linkEngel = JSON.parse(fs.readFileSync("././jsonlar/linkEngelle.json", "utf8"));
  if(!linkEngel[message.guild.id]){
		linkEngel[message.guild.id] = {
			linkEngel: "kapali"
		  };
  };

		fs.writeFile("././jsonlar/linkEngelle.json", JSON.stringify(linkEngel), (x) => {
        if (x) console.error(x)
      })
    
    if (linkEngel[message.guild.id]) {
      
    delete linkEngel[message.guild.id]
    delete linkEngel[message.guild.id].linkEngel
      
    }*/
    
	};
}

	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['link-engel'],
		permLevel: 4,
    kategori: "ayarlar",
    category: "settings"
	  };
	  
	exports.help = {
		name: 'link-engelle',
		description: 'Lİnk engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'link-engelle <aç/kapat>',
    enname: 'link-prevention',
    endescription: 'It allows you to turn on and off the Link blocking system.',
    enusage: 'link-prevention <on/off>'
	};