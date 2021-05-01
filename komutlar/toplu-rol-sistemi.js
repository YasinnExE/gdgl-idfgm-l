const Discord = require('discord.js');
const data = require('quick.db');
let botid = ('798574936988844033') 
exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed().setTitle('OneWoo Toplu Rol Sistem').setDescription(`
☀️ \`${client.ayarlar.prefix}t-rol-al\`
Sunucunuzda ki üyelerin üzerinde olan **ROL ID** girerek hepsinden rolü kaldırır

☀️ \`${client.ayarlar.prefix}t-rol-ver\`
Sunucunuzda ki üyelerinize bir **ROL ID** girerek hepsine o rolü verir`)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif'));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'toplu-rol-sistem'
};