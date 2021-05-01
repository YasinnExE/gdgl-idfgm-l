const Discord = require('discord.js');
const data = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args) => {
const logChannel = await data.fetch(`mute.log.${message.guild.id}`);
const muteYetkili = await data.fetch(`muteyetki.role.${message.guild.id}`);
if(!logChannel) return;
if(!muteYetkili) return;

const errorEmbed = new Discord.MessageEmbed()
.setColor('#00001');
const errorEmbed2 = new Discord.MessageEmbed()
.setTitle('Bir hata oldu!');

if(!message.member.permissions.has(muteYetkili)) return message.channel.send(errorEmbed.setDescription(`${message.guild.roles.cache.get(muteYetkili)} | Rolüne sahip olman gerekiyor.`));
if(!args[0]) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!').setDescription(`Kullanıcı etiketleyerek dener misin?

**Örnek olarak**:
\`\`\`${client.ayarlar.prefix}unsesmute @üyeetiketi
${client.ayarlar.prefix}unsesmute 686185592899633200\`\`\``));

let member;
if(message.mentions.members.first()) {
member = message.mentions.members.first();
} else if(args[0]) {
member = message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send(errorEmbed.setTitle('Bir hata oldu!').setDescription(`Kullanıcı etiketleyerek dener misin?

**Örnek olarak**:
\`\`\`${client.ayarlar.prefix}unsesmute @üyeetiketi
${client.ayarlar.prefix}unsesmute 686185592899633200\`\`\``));
}

if(message.author.id === member.id) return message.channel.send(new Discord.MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription(`O kadar yürekli olamazsın..,`))
if(member.permissions.has('ADMINISTRATOR')) return message.channel.send(errorEmbed2.setDescription('Yönetici bir kullanıcıya kaçar ben'));
member.voice.setMute(false);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'unsesmute'
};