const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
  
         const temizlemesajembed1 = new Discord.MessageEmbed()
.setDescription('<:ReddetmekPng:807560290035564605> Temizlemek istediğin mesaj sayısını gir! ')
.setTimestamp()
.setFooter('OneWoo')
.setColor(0x36393E)
 
                const temizlemesajembed2 = new Discord.MessageEmbed()
.setDescription('<:ReddetmekPng:807560290035564605> Sayının içinde harf var!')
.setTimestamp()
.setFooter('OneWoo')
.setColor(0x36393E)
                
                       const temizlemesajembed3 = new Discord.MessageEmbed()
.setDescription('<:ReddetmekPng:807560290035564605> `14` günden önceki mesajları silemem!')
.setTimestamp()
.setFooter('OneWoo')
.setColor(0x36393E)
                       
                              const temizlemesajembed4 = new Discord.MessageEmbed()
.setDescription(`<:OnayPng:807560289196179486> ${args[0]} adet mesaj başarıyla silindi!`)
.setTimestamp()
.setFooter('OneWoo')
.setColor(0x36393E)
                              
 if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`<:ReddetmekPng:807560290035564605> Bu komutu kullanailmek için \`MANAGE_MESSAGES\` yetkisine sahip olmalısın!`);
  var selambenxsrow = args.slice(0).join(' ')
  
  if (!selambenxsrow) return message.channel.send(temizlemesajembed1)
  if (isNaN(selambenxsrow)) return message.channel.send(temizlemesajembed2)
  let fetched = await message.channel.messages.fetch({limit: args[0]})
  
  message.channel.bulkDelete(fetched)
  .catch(error => message.channel.send(temizlemesajembed3))
  
  message.channel.send(temizlemesajembed4).then(msg => msg.delete({ timeout: 8000, reason: 'mesaj silme' }))
  
	message.delete();
    
}
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil"],
  permLevel: 0
};
exports.help = {
  name: 'temizle',
};