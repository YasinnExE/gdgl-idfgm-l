const ukqzn = require('discord.js')
let botid = ('798574936988844033') 
exports.run = function(client, message, args) {

const embed = new ukqzn.MessageEmbed()
.setTimestamp()
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.addField(`Botta Bulunan Toplam Komut Sayısı`,`${client.commands.size}`)
  message.channel.send(embed)
  
  
};
exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ["toplam-komut","komut-sayısı","komutsayısı"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'toplamkomut' //ukqzn
  };