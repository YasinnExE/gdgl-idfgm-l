const Discord = require('discord.js')
const resim = ['https://media.tenor.com/images/26debd95aef0bd1b313b4c107faf9ec4/tenor.gif',

'https://media.tenor.com/images/e9c6fd7eb5f134f131300842cfec547a/tenor.gif' ,

'https://media.tenor.com/images/7a562ca4da1b9953f974a90b93efeed7/tenor.gif' ,

'https://media.tenor.com/images/0ca33edf3c13a51ca84787268b9fa1d2/tenor.gif' ,

'https://media.tenor.com/images/87c326c3a36e6c5d0b53cd58e8e6fce8/tenor.gif' ,

'https://media.tenor.com/images/9a1e4ac4202d90f9ffcb8ffdd538f109/tenor.gif'

]


exports.run = function(client, message, args) {

message.channel.send(

  new Discord.MessageEmbed()

  .setColor("WHITE")

  .setTitle("Atamızın Resmi!")

  .setImage(resim[Math.floor(Math.random() * resim.length)])
  
  .setFooter(message.guild.name, client.user.avatarURL)

  .setTimestamp()

  )

}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'atatürk',

  description: 'Random Atamızın Resmini Paylaşır.',

  usage: 'atatürk'

}