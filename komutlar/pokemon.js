const Discord = require('discord.js')
const Pokedex = require('pokedex-api')
const pokedex = new Pokedex()
 
exports.run = async (client, message, args) => {
  
  const db = require('quick.db');
  
      var s = 'tr'
  var a = client.commands.get('pokemon').help.name
  var c = "Erkek"
  var c2 = "Kadın"
    if(db.has(`dil_${message.guild.id}`) === true) {
        var s = 'en'
        var a = client.commands.get('pokemon').help.enname
        var c = "Male"
        var c2 = "Woman"
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
       
        try {
                const pokeponum = args.join(" ")
                const pokemon = await pokedex.getPokemonByName(encodeURIComponent(pokeponum));
                const pokepon = pokemon[0]
                const embed = new Discord.RichEmbed()
                        .setAuthor(`${pokepon.name} | ${dil.pokemon.header}`, `https://i.imgur.com/5NO19vd.png`)
                        .addField(dil.pokemon.no, pokepon.number)
                        .addField(dil.pokemon.tür, pokepon.species)
                        .addField(dil.pokemon.tip, pokepon.types.join(', '))
                        .addField(dil.pokemon.normal, pokepon.abilities.normal.join(', ') || dil.unknow)
                        .addField(dil.pokemon.gizli, pokepon.abilities.hidden.join(', ') || dil.unknow)
                        .addField(dil.pokemon.yumurta, pokepon.eggGroups.join(', '))
                        .addField(dil.pokemon.cinsiyet, pokepon.gender.length ? `${c}: %${pokepon.gender[0]} | ${c2}: %${pokepon.gender[1]}` : dil.unknow)
                        .addField(dil.pokemon.boy, pokepon.height)
                        .addField(dil.pokemon.ağır, pokepon.weight)
                        .setThumbnail(pokepon.sprite)
                        .setColor("RANDOM")
                message.channel.send({embed})
        } catch (err) {
                const embed = new Discord.RichEmbed()
                        .setDescription(dil.dont)
                        .setColor("RANDOM")
                message.channel.send({embed})
        }
}
 
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['pokedex'],
        permLevel: 0,
        kategori: 'eğlence',
  category: "fun"
}
 
exports.help = {
        name: 'pokemon',
        description: 'Belirtilen Pokemon hakkında bilgi verir.',
        usage: 'pokemon <pokemon ismi/pokemon id numarası>',
  enname: 'pokemon',
        endescription: 'Gives information about specified Pokemon.',
        enusage: 'pokemon <pokemon name/pokemon id number>'
}