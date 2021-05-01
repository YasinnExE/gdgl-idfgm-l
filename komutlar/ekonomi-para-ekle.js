const Discord = require("discord.js");//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
module.exports.run = async (client, message, args) => {

//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  let user = message.mentions.users.first()
let money = args[1]    
  if(message.author.id !== ayarlar.sahip) return message.react("❌")
  if(!user) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`Cüzdanına para eklenecek kişiyi etiektlemelisin!`))
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  if(!args[1]) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Cüzdana eklenecek para miktarını girmelisin!`)) 
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  if(isNaN(args[1])) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Cüzdana eklenecek para miktarını girmelisin!`)) 
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  if(args[1] < 0) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Girdiğin miktar geçerli bir sayı değil !?`)
                                                      );    

//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\ 
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ ${user} kullanıcısının cüzdanına ${money} 💸 eklendi!`))
db.add(`para_${user.id}`, money)  
}
  
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
exports.conf = {
  enabled: true,
  aliases: ["paraekle"],
};

exports.help = {
  name: 'para-ekle',
};//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
 