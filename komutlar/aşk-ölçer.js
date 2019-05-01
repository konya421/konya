const Discord = require('discord.js');

exports.run = (client, message, args) => {
      message.delete()

  //if(message.author.id !== "486817385051979786") return message.reply("Bu komut şuanda güncellenmektedir!")
  
  const db = require('quick.db');
  
  var o = 'tr'
  var b = client.commands.get("aşk-ölçer").help.name
  var h = "ve"
  var y1 = "Biraz daha uğraşırsan bu iş olacak gibi :)"
  var y2 = "Eh biraz biraz bir şeyler var gibi."
  var y3 = "Azıcıkta olsa bir şeyler hissediyor sana :)"
  var y4 = "Bu iş olmaz sen bunu unut."
  var y = "Sizi evlendirelim <3"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var o = 'en'
        var b = client.commands.get("aşk-ölçer").help.enname
        var h = "and"
        var y1 = "If you try a little more like this work will be :)"
        var y2 = "Well a bit like a little something there."
        var y3 = "It feels a little bit of things though :)"
        var y4 = "This won't work, you forget it."
        var y = "Let us marry you <3"
    }
  const dil = client[o]
  const a = b
 
        let member = message.guild.member(message.mentions.users.array()[0] || message.guild.members.get(args[0]))
        let member2 = message.guild.member(message.mentions.users.array()[1] || message.guild.members.get(args[1]))
        var s = message.author
        if(member2) {
                var s = member2.user
        }
        if(!member) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", a))
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        var anasonuc = Math.floor(Math.random() * 101)
        var kalp = ''
        var akalp = ''
        if(Math.floor(Math.round(anasonuc / 10) * 10) >= 10) {
                var c = 0
                for(var i = 0; i < Math.floor(Math.round(anasonuc / 10)); i++) {
                        kalp += '❤️'
                        c++
                }
                for(var x = c; x < 10; x++) {
                        akalp += `🖤`
                }
        } else {
                var kalp = '🖤'
                var akalp = '🖤🖤🖤🖤🖤🖤🖤🖤🖤'
        }
  var yorum = y
        if(anasonuc < 80) {
                var yorum = y1
        }
        if(anasonuc < 60) {
                var yorum = y2
        }
        if(anasonuc < 40) {
                var yorum = y3
        }
        if(anasonuc < 20) {
                var yorum = y4
        }
  
        const embed = new Discord.RichEmbed()
                .setAuthor(`${member.user.tag} ${h} ${s.tag}`)
                .setDescription(`${dil.ask.yuzde} **%${anasonuc}**! \n${kalp}${akalp} \n\n${yorum}`)
                .setColor("RANDOM")
        message.channel.send({embed})
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["aşk"],
  permLevel: 0,
    kategori: "eğlence",
  category: "fun"
};

exports.help = {
  name: 'aşk-ölçer',
  description: 'İki kullanıcı arasındaki aşkı ölçer.',
  usage: 'aşk-ölçer <@kullanıcı> veya aşk-ölçer <@kullanıcı> <@kullanıcı>',
  enname: 'love-meter',
  endescription: 'It measures love between two users.',
  enusage: 'love-meter <@user> or love-meter <@user> <@user>'
};