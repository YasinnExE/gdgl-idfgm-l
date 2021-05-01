const Discord = require('discord.js');

const db = require("quick.db")

exports.run = async (client, message, args) => {

let kanal = await db.fetch(`seviyekanal${message.guild.id}`)

let xp = await db.fetch(`seviyexp${message.guild.id}`)

let sınır = await db.fetch(`seviyesınır${message.guild.id}`)

let kanal1 = [];

  if(kanal) kanal1 = `<:OnayPng:807560289196179486> **Açık!**`

  if(!kanal) kanal1 = `<:ReddetmekPng:807560290035564605> **Kapalı!**`

  let xp1 = [];

  if(xp) xp1 = `<:OnayPng:807560289196179486> \`${xp}\``

  if(!xp) xp1 = `<:ReddetmekPng:807560290035564605> **Ayarlanmamış! Default: \`250\`**`

let sınır1 = [];

  if(sınır) sınır1 = `<:OnayPng:807560289196179486> \`${sınır}\``

  if(!sınır) sınır1 = `<:ReddetmekPng:807560290035564605> **Ayarlanmamış! Default: \`5\`**`

message.channel.send(new Discord.MessageEmbed()

.setColor("RANDOM")

.setTitle(`${message.guild.name} Sunucusuna Ait Seviye-Sistemi Ayarları!`)   

.addField(`**Seviye-Log**`, `${kanal1}`,true)

.addField(`**Mesaj Başı Verilecek Xp**`, `${xp1}`,true)       

.addField(`**Kaç Puan Seviye Atlama**`, `${sınır1}`,true))

};

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'seviye-ayarlar'

};