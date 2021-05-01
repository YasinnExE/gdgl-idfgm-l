const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('709489466913325168') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **OneWoo Bot Yeni Komutlar Menüsüne Hoşgeldiniz** `)
        .setDescription(`

  **» <a:ok1:824970054923452497> ${prefix}slowmode**  Kanala Yavaş-Mod Ayarlarsınız.	
  **» <a:ok1:824970054923452497> ${prefix}roles**  Bütün Rolleri Gösterir.
  **» <a:ok1:824970054923452497> ${prefix}sunucukur**  Sunucu Kurar Ama Rolleri Kurmaz.
  **» <a:ok1:824970054923452497>${prefix}steamara**  Steam Oyun Arar.
  **» <a:ok1:824970054923452497> ${prefix}film-öner**  Size Film Onerir.

▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yenikomutlar'],
  permLevel: 0,
};

exports.help = {
  name: 'yenikomutlar',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};