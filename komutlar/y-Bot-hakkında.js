const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('798574936988844033') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **OneWoo Bot Yardım Menüsüne Hoşgeldiniz** `)
        .setDescription(`
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}sponsor __Bize Sponsor Olan Kişileri Gösterir.__**
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**
**»   <:NormalEmojiM3L1H110:825007146877583400> ${prefix}sunucutanıt__sunucunuzu tanıtırsınız.__**
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bothakkında'],
  permLevel: 0,
};

exports.help = {
  name: 'bot-hakkında',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};