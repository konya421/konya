const Discord = require('discord.js')
const numerals = {
                                        "M": 1000,
                                        "CM": 900,
                                        "D": 500,
                                        "CD": 400,
                                        "C": 100,
                                        "XC": 90,
                                        "L": 50,
                                        "XL": 40,
                                        "X": 10,
                                        "IX": 9,
                                        "V": 5,
                                        "IV": 4,
                                        "I": 1
                                }
 
exports.run = (client, message, args) => {
  
  const db = require('quick.db');
  
  var s = 'tr'
  var a = client.commands.get('romen').help.name
  var b = "Lütfen `999999` veya daha düşük bir sayı yazın!!"
  var f = "Karşılıksız"
  var n = "Yazılan Sayı"
  var r = "Romen Karşılığı"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('romen').help.enname
        var b = "Please type a number `999999` or less !!"
        var f = "Unrequited"
        var n = "Number Written"
        var r = "Romen Provision"
    }
    const dil = client[s]
    const o = a
  
        if(!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        if(isNaN(args[0])) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.number)
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
       
        if(args[0] > 999999) {
                const embed = new Discord.RichEmbed()
                        .setDescription(b)
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        const sayi = args[0]
 
        if(sayi === "0" || sayi === 0) {
                const embed = new Discord.RichEmbed()
                        .setDescription(f)
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        let result = '';
        for (const [numeral, value] of Object.entries(numerals)) {
                while (args[0] >= value) {
                        result += numeral;
                        args[0] -= value;
                }
        }
        const embed = new Discord.RichEmbed()
                .addField(n, sayi)
                .addField(r, result)
                .setColor("RANDOM")
        message.channel.send({embed})
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['roman'],
        permLevel: 0,
        kategori: "kullanıcı",
  category: "user"
}
 
exports.help = {
        name: 'romen',
        description: 'Yazdığınız sayının romen karşılığını yazar.',
        usage: 'romen <sayı>',
  enname: 'romen',
        endescription: 'Writes the roman equivalent of the number you write.',
        enusage: 'romen <number>'
}
