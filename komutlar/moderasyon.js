const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const talkedRecently = new Set();
let botid = ('798574936988844033') 
exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";  
    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('#d02090')
       .setTitle(`<a:YanpSnennleGif:807560492709183529> **OneWoo Bot Moderasyon Menüsüne Hoşgeldiniz** `)
        .setDescription(` ${prefix}moderasyon2 Menümüze Bakmayı Unutmayın.
  **»<a:ok1:824970054923452497>  ${prefix}gç-ayarla**  Resimli Hg-BB sistemini Açarsınız.
  **»<a:ok1:824970054923452497>  ${prefix}giriş-çıkış-sıfırla**  Ayarlanan Resimli Hg-BB Sistemini Kapatırsınız.
  **»<a:ok1:824970054923452497>  ${prefix}temizle **  Belirlenen Miktarda Mesaj Siler.
  **»<a:ok1:824970054923452497>  ${prefix}sunucupanel **  Sunucu Panel Açar.
  **»<a:ok1:824970054923452497>  ${prefix}unban **  İdsi Girelen Kullanıcıyı Banının Açar.
      **»<a:ok1:824970054923452497>  ${prefix}sohbet-kapat**  Sohbeti Kapatırsınız.
    **»<a:ok1:824970054923452497>  ${prefix}sohbet-aç**  Sohbeti Aktif Eder.
  **»<a:ok1:824970054923452497>  ${prefix}sunucudan-ayrıl **  Sunucudan Ayrılır.
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};