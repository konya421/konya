const Discord = require('discord.js')
const request = require('node-superfetch')
const moment = require('moment')
const { GOOGLE_KEY } = process.env
 
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  var s = 'tr'
  var a = client.commands.get('kitap-ara').help.name
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('kitap-ara').help.enname
    }
  const dil = client[s]
  const o = a
  
        if (!args[0]) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.argerror.replace("{prefix}", client.ayarlar.prefix).replace("{komut}", o))
                        .setColor("RANDOM")
                message.channel.send({embed})
                return
        }
 
        const kitap = args.join(" ")
 
        try {
                const { body } = await request
                        .get('https://www.googleapis.com/books/v1/volumes')
                        .query({
                                apiKey: GOOGLE_KEY,
                                q: kitap,
                                maxResults: 1,
                                printType: 'books'
                        });
 
                if(!body.items) {
                        const embed = new Discord.RichEmbed()
                                .setDescription(dil.dont)
                                .setColor("RANDOM")
                        message.channel.send({embed})
                        return
                }
       
                const data = body.items[0].volumeInfo;
 
                const embed = new Discord.RichEmbed()
                        .setAuthor(`${data.title} | ${dil.kitap.header}`, "https://i.imgur.com/N3oHABo.png", `https://books.google.com.tr/`)
                        .addField(dil.kitap.yazar, data.authors || 'Bilinmiyor')
                        if(!data.publishedDate) {
                                embed.addField(dil.kitap.tarih, dil.unknow)
                        } else {
                                embed.addField(dil.kitap.tarih, data.publishedDate)
                        }
                        embed.addField(dil.kitap.sayfa, data.pageCount || dil.unknow)
                        if(data.imageLinks) {
                                embed.setThumbnail(`${data.imageLinks ? data.imageLinks.thumbnail : null}`)
                        }
                        embed.setColor("RANDOM")
                message.channel.send({embed})
        } catch (err) {
                message.channel.send(`${dil.error} ${err}`)
        }
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['kitap', 'kitapara'],
        permLevel: 0,
        kategori: "kullanıcı",
  category: "user"
}
 
exports.help = {
        name: 'kitap-ara',
        description: 'Yazılan kitabın bilgisini gösterir.',
        usage: 'kitap-ara <kitap ismi>',
  enname: 'search-book',
  endescription: 'Shows the information of the written book.',
  enusage: 'search-book <book name>'
}