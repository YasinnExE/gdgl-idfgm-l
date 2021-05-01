const Discord = require('discord.js')
const db = require('quick.db')

module.exports.go = async(client,message,args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('<a:no:655475871033065502> Ban yetkisine sahip olmalısın!')
   let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0]
  let users = client.users.cache.get(user)
  if (!user) return message.channel.send(`Bir kullanıcı idsi girmelisin.`)
  if (!reason) reason = 'Neden belirtilmemiş.'

  message.guild.members.unban(user)
  message.channel.send(`**[${user}]** idli kullanıcının yasağı kaldırıldı!`)

  users.send(`\`${message.guild.name}\` **adlı sunucudan** \`${reason}\` **sebebi ile yasağın başarıyla kaldırıldı!**`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};