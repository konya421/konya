const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.delete()
    let user = message.mentions.users.first() || message.author
    if (!user) return message.reply("Avatarını almak istediğin kişiyi etiketlemelisin!")
    
    const avatar = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(user.tag, user.avatarURL)
        .setDescription(`[Avatar URL Link](${user.avatarURL})`)
        .setImage(user.avatarURL)
    message.channel.send(avatar)
    
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["pp"],
  permLevel: 0,
    kategori: "kullanıcı",
  category: "user"
};

exports.help = {
  name: 'avatar',
  description: 'Avatarınızı gösterir.',
  usage: 'avatar veya avatar <@kullanıcı>',
  enname: 'avatar',
  endescription: 'It shows your avatar.',
  enusage: 'avatar or avatar <@user>'
};