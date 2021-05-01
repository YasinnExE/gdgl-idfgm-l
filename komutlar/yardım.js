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
  **<:butterfly_1:825676027799535636> ${prefix}yardım2** <:butterfly_1:825676027799535636>\n
  		  **<a:ok1:824970054923452497> ${prefix}kullanıcı**  \`Kullanıcı Komutlarıni Gösterir.\`\n
  **<a:ok1:824970054923452497> ${prefix}kayıt**  \`Kayıt Komutlarını Gösterir.\` \n
  **<a:ok1:824970054923452497> ${prefix}koruma-yardım**  \`Koruma Komutlarını Gösterir.\` \n
  **<a:ok1:824970054923452497> ${prefix}sunucu-tema-sistem**  \`Sunucu Şablonları Gösterir.\`\n
  **<a:ok1:824970054923452497>  ${prefix}mute-sistem**  \`İlk Olarak Kurulum Yapınız.\`\n
  **<a:ok1:824970054923452497>  ${prefix}tagrol-sistem**  \`Tag Sistemi \`\n
  **<a:ok1:824970054923452497>  ${prefix}ticketyardım**  \`Ticket Sistemidir \`\n
  **<a:ok1:824970054923452497> ${prefix}botlist-yardım**  \`Botlist İle Alakalı Şeyler Gösterir.\` \n
  **<a:ok1:824970054923452497> ${prefix}ekonomiyardım**  \`Ekonomi Komutlarını Gösterir. (Yeni!!)\` \n
  **<a:ok1:824970054923452497> ${prefix}bothakkında**  \`Bot Hakkında Bilgi Verir\` \n
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};