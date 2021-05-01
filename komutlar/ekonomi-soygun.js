const Discord = require('discord.js')
const db = require('quick.db')//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
const ms_2 = require('parse-ms')
exports.run = async (client, message, args) => {
          let user = message.author;
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
  let timeout = 840000;
   function rastgeleMiktar(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 
 

      let crime = await db.fetch(`soygunsüre_${message.author.id}`)

      if (crime !== null && timeout - (Date.now() - crime) > 0) {
        
        let time = ms_2(timeout - (Date.now() - crime));
    
        message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                        .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                        .setDescription(`⏱ Soygun yapmak için ${time.minutes ? time.minutes + ' dakika,' : ''} ${time.seconds ? time.seconds + ' saniye beklemelisin!' : 'tekrar dene!'}`))
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
      } else {
       
        const result = [
          "WINWIN",
          "LOOSELOOSE"
        ] 
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
        let awnser = result[Math.floor(Math.random() * result.length)];
     const cümleler = [
       "Soygun bittikten sonra polis seni yakaladı",'Masken yırtıldı, ifşa oldun',"Tofaş çalarken yaşlı amca seni yakaladı","Marketi soyarken kekolar seni patakladı","Boksör adamı soymaya çalışırken dayak yedin"
     ,'Kekolar seni bankayı soyup kaçarken yakaladı',"Tofaşı çalarken alarm öttü"]
     var cümle = cümleler[Math.floor(Math.random() * cümleler.length)]
     if (awnser === "LOOSELOOSE") {
 var kaybettin = rastgeleMiktar(400,900)         
      message.channel.send(new Discord.MessageEmbed()
                      .setColor("RED")
                      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
                      .setDescription(`${cümle} ve ${kaybettin} 💸 kaybettin!`));
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
       await db.add(`para_${user.id}`, -kaybettin);   
      await db.set(`soygunsüre_${user.id}`, Date.now());
        } else {
 const sentences2 = ["Ünlü bir iş adamını soydun","Şehirdeki bir süpermarketi soydun","Mahalledeki dayının tofaşını çaldın","Galeri soygunu yaptın",'Nokia çalıp birisine sattın',"Tofaş çaldın"]
     var sentence2 = sentences2[Math.floor(Math.random() * sentences2.length)]
         var kazandın = rastgeleMiktar(800,1700)
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
      .setColor("GREEN")
      .setDescription(`${sentence2} ve ${kazandın} 💸 kazandın!`)
      message.channel.send(embed)       
    await db.add(`para_${user.id}`, kazandın);
    await db.set(`soygunsüre_${user.id}`, Date.now());
//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\
        }}}

exports.conf = {
  enabled: true,
  aliases: ["soygunyap","soygun-yap"],
};

exports.help = {
  name: 'soygun',
};//== BEERCODE (https://discord.gg/ew3dpTu4Z5) BEERCODE ==\\