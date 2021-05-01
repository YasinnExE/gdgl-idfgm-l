const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  let rol = message.mentions.roles.first();
  
  if (!rol) return message.reply('Lütfen mute atacak rolü etiketleyin!')
  
  db.set(`muterol_${message.guild.id}`, rol.id);
  
  message.channel.send(`Mute rolü \`${rol.name}\` olarak ayarlandı!`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "mute-rol-ayarla"
}