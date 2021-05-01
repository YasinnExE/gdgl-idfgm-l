const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
   
  db.delete(`muterol_${message.guild.id}`);
  
  message.channel.send(`Mute rolü başarıyla sıfırlandı.`)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "mute-rol-sıfırla"
}