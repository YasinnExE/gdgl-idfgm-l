const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\  
          let user = message.mentions.users.first() || message.author
          
  var cüzdan = db.fetch(`para_${user.id}`)
  var banka = db.fetch(`bankapara_${user.id}`)   
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  var toplam= cüzdan+banka
message.channel.send(new Discord.MessageEmbed()
                  .setColor("YELLOW")
                  .setAuthor(user.tag, user.avatarURL({dynamic: true}))     
                  .addField("Cüzdan",`${cüzdan ? cüzdan + ' 💸' : "0 💸"}`,true)
                  .addField("Banka",`${banka ? banka + ' 💸'    : "0 💸"}`,true)
                  .addField("Toplam",`${toplam ? toplam + ' 💸' : "0 💸"}`,true))
  }

//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
exports.conf = {
  enabled: true,
  aliases: ["money", "bank", "cüzlan"],
};
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
exports.help = {
  name: 'para',
};