
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  
  let kişi = message.mentions.members.first()


  let botcubaraba = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setDescription(`**<@!${message.author.id}> Yolu Aç !**`)
  .setImage('https://cdn.discordapp.com/attachments/814532381570629712/820303236061724672/979a3a2d4663b710b8e0e86ffe47ab45.gif')
  message.channel.send(botcubaraba)  
  
    
  } 

exports.conf = {                
    aliases: ['car']
}
exports.help = {
  name: 'araba',
  usage: 'Bot Club Araba Komudu'
}