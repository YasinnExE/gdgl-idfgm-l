const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
const db = require("quick.db");
let botid = ('798574936988844033') 
exports.run = async(client, message, args) => {
 let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!"; 
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(` **OneWoo Bot Seviye Menüsüne Hoşgeldiniz**`)
        .setDescription(`
 
  **» <a:ok1:824970054923452497> ${prefix}seviye**  Mevcut Olduğunuz Seviyeyi Gösterir.
  **» <a:ok1:824970054923452497> ${prefix}seviye-ayarlar**  Sunucuda Aktif Olan Seviye Ayarlarını Gösterir.
  **» <a:ok1:824970054923452497> ${prefix}seviye-rol**  İstenilen Seviyeye Gelince Verilecek Rolü Ayarlar.
  **» <a:ok1:824970054923452497> ${prefix}seviye-sıfırla **  Mevcut Seviye Sistemini Sıfırlar
  **» <a:ok1:824970054923452497> ${prefix}seviye-sınır **  Maksimum Kazanılanabilecek Seviyeyi Belirler.
  **» <a:ok1:824970054923452497> ${prefix}seviye-xp **  Bir Mesaj Başına Verilecek Xp yi ayarlar.
  **» <a:ok1:824970054923452497> ${prefix}seviye-top **  Sunucuda ki En yüksek 5 Kişiyi Gösterir
  **» <a:ok1:824970054923452497> ${prefix}seviyerolleri **  Hangi Seviye de Rol Verilecek Onu Gösterir.
    **» <a:ok1:824970054923452497> ${prefix}seviye-log **  Seviye Logu Ayarlarsız.
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seviye-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'seviye-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'seviye-yardım'
};