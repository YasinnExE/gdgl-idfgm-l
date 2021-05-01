const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  let davetlerim = await db.fetch(`davet_${message.author.id}_${message.guild.id}`)
  var user = message.mentions.users.first() || message.author;

const embed = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setTitle(`${client.user.username} - Davetlerim`)
.setColor('BLACK')
.setDescription(`Davet Sayım: **${davetlerim ? davetlerim : "0"}**`)
.setThumbnail(user.avatarURL())
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(embed) 

}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'davetlerim'
}
