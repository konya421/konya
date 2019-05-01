const Discord = require('discord.js'); 
const db = require('quick.db'); 

exports.run = async (client, message, args, params) => { 
  
  var s = 'tr'
  var a = client.commands.get('komut-ekle').help.name
  var b = "Botun zaten var olan bir komutunu özel komut olarak ekleyemezsin!"
  var x = "İsimli Özel Komut Başarıyla Oluşturuldu!"
  var y = "`{cevap}` olarak cevap verecektir!"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('komut-ekle').help.enname
        var b = "Bot can not add a command that already exists as a custom command!"
        var x = "Custom Command Created Successfully!"
        var y = "The command will reply as `{cevap}`"
    }
    const dil = client[s]
    const o = a
  
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`); 
    
  if (!args[0]) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
  if (!args.slice(1).join(' ')) return message.reply(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
    
  if (client.commands.get(args[0])) return message.reply(b)
  if (client.aliases.get(args[0])) return message.reply(b)
  
  //db.set(`komutkomuts_${message.guild.id}`, db.has(`komutkomuts_${message.guild.id}`) ? db.fetch(`komutkomuts_${message.guild.id}`) + 1 : 1)
  /*var i = db.set(`komutkomut_${message.guild.id}_${s}`, args[0])
  var a = db.set(`cevapcevap_${message.guild.id}_${s}`, args.slice(1).join(' '))*/
  
  let obj = JSON.parse('{"'+args[0]+'":"'+args.slice(1).join(' ')+'"}')
  
  var i = db.push(`komut_${message.guild.id}`, obj)
  //var a = db.push(`aciklama_${message.guild.id}`, args.slice(1).join(' '))

    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
   .setTitle(`${args[0]} ${x}`) 
   .setDescription(y.replace("{cevap}", args.slice(1).join(' '))) 
    message.channel.send(embed)
  
};

exports.conf = { 
  enabled: true, 
  guildOnly: false, 
  aliases: ['komutekle', 'komut-oluştur'], 
  permLevel: 4,
    kategori: "özel",
  category: "special"
}; 

exports.help = { 
  name: 'komut-ekle', 
  description: 'Sunucuya özel komut ekler.', 
  usage: 'komut-ekle <komut adı> <komut açıklaması>',
  enname: 'add-command',
  endescription: 'Adds a custom command to the server.',
  enusage: 'add-command <command name> <command description>'
};