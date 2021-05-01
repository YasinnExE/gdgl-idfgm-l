const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")

exports.run = async (client, message, args, member) => {
  
const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
if(kisi) return;
  
const sebep = args[0]
if(!args[0]){
  
let kullanıcı = message.guild.members.cache.get(message.author.id)
  
await db.set(`afkSebep_${message.author.id}_${message.guild.id}`)
await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id)
await db.set(`afkAd_${message.author.id}_${message.guild.id}`)
  
const a = await db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`)
 
const embed = new Discord.MessageEmbed()

.setAuthor("OneWoo Afk Sistemi" , client.user.avatarURL)
.setColor("GREEN")

.setDescription(`Başarıyla Afk Oldunuz \n Sebep: ${a}`)

.setFooter(`${message.author.username} Tarafından İstendi`)
.setTimestamp()

message.channel.send(embed)
    
message.member.setNickname(`[AFK] `)
}
  
if(args[0]){
    
let sebep = args.join(" ");
let kullanıcı = message.guild.members.cache.get(message.author.id)

const b = kullanıcı.displayName

await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep)
await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id)
await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b)

const a = await db.fetch(`afkSebep_${message.author.id}_${message.guild.id}`)

const embed = new Discord.MessageEmbed()

.setAuthor("OneWoo Afk Sistemi" , client.user.avatarURL)
.setColor("GREEN")

.setDescription(`Başarıyla Afk Oldunuz \n Sebep: ${a}`)

.setFooter(`${message.author.username} Tarafından İstendi`)
.setTimestamp()

message.channel.send(embed)
    
message.member.setNickname(`[AFK] ` + b)
}
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["afk"],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'Afk Olmanızı Sağlar.',
  usage: 'afk / afk <sebep>'
};