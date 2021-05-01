const Discord = require("discord.js");
const db = require('quick.db')//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
module.exports.run = async (client, message, args) => {
  
  let param = db.fetch(`para_${message.author.id}`)
    let miktar = args[0]//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
//-----------------------------------------------------------------------------------------------------\\   

    if(!miktar) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Bankaya yatırılacak para miktarını girmelisin!
\`!yatır <miktar || hepsi>\``))
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
//-----------------------------------------------------------------------------------------------------\\
 if(miktar === 'hepsi' || miktar === 'all') {
   if(param === 0) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription("⛔ Bankaya yatırmak için hiç paran yok!"))
db.add(`bankapara_${message.author.id}`, param)
db.add(`para_${message.author.id}`, -param)   
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ Başarılı, bankaya ${param} 💸 yatırdın!`))
} else {//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
    if(isNaN(miktar)) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Girdiğin miktar geçerli bir sayı değil !?`))  
  }//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
//-----------------------------------------------------------------------------------------------------\\
      if(miktar < 0 || miktar.startsWith('0')) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`🤔 Geçerli sayımı acaba bu?`))
   if (miktar > param) return message.channel.send(new Discord.MessageEmbed()
.setColor("RED")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`⛔ Bankaya yatırmak için elinde sadece ${param} 💸 var`))
  //== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
//-----------------------------------------------------------------------------------------------------\\
if(args[0] === 'all' || args[0] === 'hepsi') {
  return;
}  else {//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
message.channel.send(new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`✅ Başarılı, bankaya ${miktar} 💸 yatırdın!`))
db.add(`para_${message.author.id}`, -miktar)
db.add(`bankapara_${message.author.id}`, miktar) 
  }//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
}
exports.conf = {
  enabled: true,
  aliases: ["dep","deposit","yatir"],
};

exports.help = {
  name: 'yatır',
};//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\\