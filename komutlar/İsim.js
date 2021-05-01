const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_NICKNAMES')) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setTitle('<:ReddetmekPng:807560290035564605> Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}isim\` **kullanmak için,** \`Kullanıcı Adlarını Yönet\` **yetkisine sahip olman gerekiyor.**`));
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`<:ReddetmekPng:807560290035564605> Kullanıcı Etiketleyerek dener misin?`)).then(a => a.delete({timeout: 10000}))
if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor('#000001').setDescription(`<:ReddetmekPng:807560290035564605> Kullanıcı Adı koyarak dener misin?`)).then(a => a.delete({timeout: 10000}))
const datas = await data.fetch(`tagg.${message.guild.id}`);
let isim;
if(datas) isim = `${datas} ${args[1]}`; 
if(!datas) isim = `${args[1]}`; 
message.mentions.members.first().setNickname(isim);
return message.channel.send(new Discord.MessageEmbed().setTitle('<a:OnaylamakGif:827627593728786503> Başarılı Şekilde İsim Değiştirildi.').setColor('#000001').setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setDescription(`${message.mentions.members.first()} **Arkadaşın ismini değiştirdik oleeyyy..**`+'\n\n```'+`${isim} adınla gurur duyuyorum knk.`+'```\n\n'))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'isim'
};