
 exports.run = (client, message) => {
        let db = require("quick.db")
        let Discord = require("discord.js")
  
    let küfür = db.fetch(`küfür.${message.guild.id}.durum`)
  const member3 = new Discord.MessageEmbed()
     .setColor("CYAN")
.setDescription(`<:ReddetmekPng:807560290035564605> **HATA** <:ReddetmekPng:807560290035564605> - Bu Sunucuda Yetkili Değilsin.`)
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(member3)
      if(küfür) {
      db.delete(`küfür.${message.guild.id}`)
      message.channel.send(`<:ReddetmekPng:807560290035564605> **Başarılı ile küfür engel kapandı.** <:ReddetmekPng:807560290035564605>`).then(l => {
      l.delete({timeout: 5000})
    })
    }else{
      db.set(`küfür.${message.guild.id}.durum`,true)
      message.channel.send(`<:OnayPng:807560289196179486> **Başarılı ile küfür engel açıldı. ** <:OnayPng:807560289196179486>`).then(l => {
      l.delete({timeout: 5000})
    })
    }
    }

 exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: 'küfürengel',
  description: 'WESTRA',
  usage: 'WESTRA'
}