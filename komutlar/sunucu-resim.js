const Discord = require('discord.js');
const db = require('quick.db')
 
exports.run = function(client, message) {
 
    const embed = new Discord.MessageEmbed()
        .setDescription("**SUNUCU ICONU**")
        .setImage(message.guild.iconURL())
 
    message.channel.send(embed);
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sunucuresim'],
  permLevel: 0
};
 
exports.help = {
  name: 'sunucu-resim',
  description: 'Serverin iconunu gösterir',
  usage: 'sunucu-resim'
};