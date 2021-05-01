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
       .setTitle(`**OneWoo Bot Koruma Menüsüne Hoşgeldiniz**`)
        .setDescription(`
  **» <a:ok1:824970054923452497> ${prefix}kanal-koruma**  Kanalları Korur
  **» <a:ok1:824970054923452497> ${prefix}rolkoruma**  rolleri Korur
  **»<a:ok1:824970054923452497>  ${prefix}güvenlik **  Resimli Güvenlik Sistemini Belirlediğiniz Kanal Yapar..
  **»<a:ok1:824970054923452497>  ${prefix}güvenlik sıfırla **  Resimli Güvenlik Sistemini Kapatırsınız.
  **»<a:ok1:824970054923452497>  ${prefix}capslock-engelleme **  CapsLock Engelleme Sistemini Açıp Kapatırsınız (İlk Yazışta Açar 2.de kapar)
  **»<a:ok1:824970054923452497>  ${prefix}küfürengel**  Küfür Sistemini Açar/Kapatırsınız.
  **»<a:ok1:824970054923452497>  ${prefix}reklamengel**  Reklam Engel Sistemini Açar/Kapatırsınız.
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['koruma-yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'koruma-yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'kayıt-sistemi'
};