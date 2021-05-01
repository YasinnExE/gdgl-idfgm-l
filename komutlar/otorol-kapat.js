const Discord = require('discord.js');
const db = require('quick.db') 
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:ReddetmekPng:807560290035564605> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

  if(!db.fetch(`judgekanal_${message.guild.id}`)) return message.channel.send('<:ReddetmekPng:807560290035564605> Sanırım bu özellik zaten kapalıymış')
   

   message.reply('<:OnayPng:807560289196179486> Bu özellik **başarıyla kapatıldı.**')
db.delete(`judgekanal_${message.guild.id}`)   
  db.delete(`judgerol_${message.guild.id}`)
db.delete(`judgemesaj_${message.guild.id}`)

}; 

exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: [], 
permLevel: 0
}

exports.help = {
 name: 'otorolkapat', 
description: 'taslak',
 usage: 'otorolkapat' 
};