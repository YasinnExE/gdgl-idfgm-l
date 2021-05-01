const Discord = require('discord.js');

const db = require("quick.db")

const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed()

.setTitle(`Uyarı`)

.setDescription(`<:ReddetmekPng:807560290035564605> Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`))

  

db.delete(`seviyesınır${message.guild.id}`)

db.delete(`seviyexp${message.guild.id}`)

db.delete(`seviyekanal${message.guild.id}`)

 return message.channel.send(new Discord.MessageEmbed()

.setColor("RANDOM")

.setThumbnail(client.user.avatarURL()) 

.setDescription(`<:OnayPng:807560289196179486> Seviye-Sistemi Bütün Ayarlamaları Sıfırlandı!`)

.setFooter(`${client.user.username} Seviye Sistemi!`)   )

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-sıfırla'

};