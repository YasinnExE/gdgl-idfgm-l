let database = require("quick.db")
let ayarlar = require("../ayarlar.json")



exports.run = async(client, message) => {
  if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.channel.send(`<:ReddetmekPng:807560290035564605> Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)
  
  let log = message.mentions.channels.first()
  if(!log) return message.channel.send(`<:ReddetmekPng:807560290035564605> **Bir kanal etiketlemen gerekmekte örnek: __${ayarlar.prefix}abonelog #kanal__**`)
  
  
  database.set(`abonelog.${message.guild.id}`, log.id)
  message.channel.send(`<:OnayPng:807560289196179486> **Abone kanalı başarıyla "${log}" olarak ayarlandı.**`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['abone-log'],
  perm: 0
}
exports.help = {
  name: 'abonelog'
}

exports.play = {
  kullanım: 'abonelog #kanal',
  açıklama: 'Abone Logunu Ayarlarsınız',
  kategori: 'Abone'
}