const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async (bot, message,args) => {
  
  
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<:ReddetmekPng:807560290035564605> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

let logk = message.mentions.channels.first();  
  
let logkanal = await db.fetch(`guvenlik${message.guild.id}`)
  
  if (args[0] === "sıfırla" || args[0] === "kapat") {   
    if(!logkanal) return message.channel.send(`<:ReddetmekPng:807560290035564605> Güvenliği kapatmak için \`güvenlik kanalının\` seçili olması lazım örnek kullanım: \`!güvenlik #kanal\``);
    
   db.delete(`guvenlik${message.guild.id}`)  
    
   message.channel.send(`<:OnayPng:807560289196179486> Güvenlik başarıyla kapatıldı.`);   
    
  
    return
  }  
  
if (!logk) return message.channel.send('<:ReddetmekPng:807560290035564605> Güvenlik kanalını bulamadım  Kullanım `!güvenlik #kanal`');  
 

   db.set(`guvenlik${message.guild.id}`, logk.id)

message.channel.send(`<:OnayPng:807560289196179486> Güvenlik başarıyla ${logk} olarak ayarlandı`);  

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['resimligks','resimligüvenlik'],
  permLevel: 4
};

module.exports.help = {
  name: 'rgüvenlik',
  description: 'güvenlik sağlar',
  usage: 'güvenlik'
};
   