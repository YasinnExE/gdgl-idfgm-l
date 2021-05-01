const Discord = require('discord.js');
const moment = require("moment");
const db = require('quick.db');

exports.run = async (client, message, args) => {
    var user = '';
    let member = message.mentions.users.first();
    let author = message.author; 
      if(member) {
        var user = member;
      } else {
        var user = author;
      }    
    member = message.guild.member(user);
  
    let roller = member.roles.cache.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name);
    let rol = member.roles.cache.filter(m => m.name !== '@everyone').map(m => `<@&${m.id}>`).join(', ')
    if (roller.length < 1) roller = ['Bu kullanıcının hiç rolü yok!'];
    
    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün]")
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const userJoined = moment.duration(millisJoined).format("Y [yıl], D [gün]")
    
    let katılım = moment(user.createdAt).format('DD.MM.YYYY')
    let sunucu = moment(member.joinedAt).format('DD.MM.YYYY')
      
    if(user.presence.status === "dnd"){
      var durum = '🔴'
    }
    else if(user.presence.status === "online"){
      var durum = '🟢'
    }
    else if(user.presence.status === "idle"){
      var durum = "🟡"
    }
      else {
      var durum = "⚫"
    }
    
    let rozet = user.flags.toArray()
    let renk = 0xffa300
    
    
    const embed = new Discord.MessageEmbed()
      .addField("Kullanıcı", `**Kullanıcı**: ${user.tag} (${user.id})\n**Takma ad**: ${member.displayName}\n**Profil**: ${member} ${durum}\n**Bot profil mi?**: ${user.bot ? '\n Evet' : 'Hayır'}\n**Rozet(ler)**: ${rozet}\n**Hesap oluşturma tarihi**: ${katılım} [**${daysCreated}** önce]\n**Sunucuya giriş tarihi**: ${sunucu} [**${userJoined}** önce]\n**Rol** [**${member.roles.cache.size}**]: ${rol}`)
      .setColor(renk)
    message.channel.send(embed)
}
exports.conf = {
aliases: ['kullanıcıbilgi']
}

exports.help = {
name: 'kullanıcı-bilgi'

}