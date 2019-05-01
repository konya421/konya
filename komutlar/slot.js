const Discord = require("discord.js");
const fs = require("fs");
const { stripIndents } = require('common-tags');
const slots = ['🔧', '💎', '💰', '💵', '💳'];

exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('slot').help.name
  var k = "Woww! Kazandın! \nHesabına **{miktar}** VECoin eklendi!"
  var y = "Olamazz! Kaybettin! \nHesabından **{miktar}** VECoin eksildi!"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('slot').help.enname
        var k = "Woww! You win! Award **{miktar}** VECoin!"
        var y = "Oh, no! You lose! **{miktar}** VECoin from account were reduced!"
    }
    const dil = client[s]
    const o = a
  
  let para = JSON.parse(fs.readFileSync("././jsonlar/para.json", "utf8"));
  
  if (!para[message.author.id]) return message.reply(dil.ekonomi.yetersiz)
  if (para[message.author.id].rc < 1) return message.reply(dil.ekonomi.yok)
  
  var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "150", "270"];
    var miktar = sans[Math.floor((Math.random() * sans.length))];
       
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {

        para[message.author.id] = {
            rc: para[message.author.id].rc + miktar
        };
  
			fs.writeFile("././jsonlar/para.json", JSON.stringify(para), (x) => {
        if (x) console.error(x)
      })

		var kazandin = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setDescription(stripIndents`
		    ${slotOne}|${slotTwo}|${slotThree}
				${slotOne}|${slotTwo}|${slotThree}
				${slotOne}|${slotTwo}|${slotThree}
				${k.replace("{miktar}", miktar)}
		`)
		return message.channel.send(kazandin);			
		}
  
        para[message.author.id] = {
            rc: para[message.author.id].rc - miktar
        };
  
		fs.writeFile("././jsonlar/para.json", JSON.stringify(para), (err) => {
				console.log(err)
		})
      
		var kaybettin = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setDescription(stripIndents`
		${slotOne}|${slotTwo}|${slotThree}
		${slotOne}|${slotTwo}|${slotThree}
		${slotOne}|${slotTwo}|${slotThree}
    ${y.replace("{miktar}", miktar)}
		`)
		return message.channel.send(kaybettin);	
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slot-oyna", "slot-makinesi"],
  permLevel: 0,
    kategori: "profil",
  category: "profile"
};

exports.help = {
  name: "slot",
  description: "Slot makinesi ile oynarsınız. Kazanırsanız rastgele para kazanır, kaybederseniz rastgele para kaybedersiniz.",
  usage: "slot",
  enname: "slots",
  endescription: "You play with the slot machine. If you win, you earn random money, if you lose you lose money at random.",
  enusage: "slots"
};