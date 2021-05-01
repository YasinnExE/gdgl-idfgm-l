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
       .setTitle(` **OneWoo Bot Botlist Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **<a:ok1:824970054923452497> ${prefix}botlist-ayar botekle-kanal #kanal**  \`Bot Ekleme Kanalı Ayarlar!\`\n
  **<a:ok1:824970054923452497> ${prefix}botlist-ayar botlog-kanal #kanal**  \`Bot Log Kanalı Ayarlar!\` \n
  ** <a:ok1:824970054923452497> ${prefix}botlist-ayar başvurugiden-kanal #kanal**  \`Başvuru kanalı Ayarlar!\`\n
  ** <a:ok1:824970054923452497> ${prefix}botlist-ayar yetkili @rol**  \`Bot List Yetkilisi Ayarlar!\`\n
  ** <a:ok1:824970054923452497> ${prefix}bot-onayla**  \`Bot Onaylarsınız.\`\n
  ** <a:ok1:824970054923452497> ${prefix}bot-reddet**  \`Bot Reddedersiniz.\`\n
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['botlist-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'botlistsistemi',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};