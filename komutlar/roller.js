const Discord = require('discord.js');

exports.run = async (client, message, args) => {//Can°B#1308
if(!message.member.hasPermission('MANAGE_ROLES')) return;
let chimped = message.guild.roles.cache.filter(a => a.name !== 'everyone' && !a.managed).sort((a, b) => a.position - b.position).map(c => c.name).reverse()
message.channel.send('```'+`Roles [${message.guild.roles.cache.size}]:\n`+chimped.join('\n')+'```')
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'roles'
};// codare ♥