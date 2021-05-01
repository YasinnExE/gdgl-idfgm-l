const Discord = require('discord.js');
const db = require('quick.db')
const ms = require('parse-ms')
exports.run = async(client, message) => {
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  function rastgeleMiktar(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
let times = await db.fetch(`worktime_${message.author.id}`)
  let Hafta = 604800000
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  if (times !== null && Hafta - (Date.now() - times) > 0) {
        let time = ms(Hafta - (Date.now() - times));
    message.channel.send(new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                        .setDescription(`⏱ Hafta ödülünü almak için ${time.days ? time.days + " gün,": ""} ${time.hours ? time.hours + " saat,": ""} ${time.minutes ? time.minutes + ' dakika,' : ''} ${time.seconds ? time.seconds + ' saniye beklemelisin!' : 'komutu tekrar gir!'}`))
  return
  }
let moneys = rastgeleMiktar(9200,10800,9200,10800,20000);
      message.channel.send(new Discord.MessageEmbed()
                   .setColor("YELLOW")
                   .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                   .setDescription(`Hafta ödülünü topladın, cüzdanına ${moneys} 💸 eklendi!`))

db.set(`worktime_${message.author.id}`, Date.now())

  db.add(`para_${message.author.id}`, moneys)
    
 };
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
exports.conf = {
  enabled: true,
  aliases: ["hafta"],
};

exports.help = {
  name: 'hafta',
};