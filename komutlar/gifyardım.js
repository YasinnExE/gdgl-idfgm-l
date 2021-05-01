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
       .setTitle(`**OneWoo Bot  Gif Menüsüne Hoşgeldiniz** `)
        .setDescription(`
 
        ** <a:ok1:824970054923452497>${prefix}gif-ara** Yazdığınız Kelime Hakkında Gif Aratır!
        ** <a:ok1:824970054923452497>${prefix}man-gif** Rastgele Erkek Gifi Atar!
        ** <a:ok1:824970054923452497>${prefix}woman-gif** Rastgele Kadın Gifi Atar!
        ** <a:ok1:824970054923452497>${prefix}couple-gif** Rastgele Sevgili Gifi Atar!
        ** <a:ok1:824970054923452497>${prefix}baby-gif** Rastgele Bebek Gifi Atar!
        ** <a:ok1:824970054923452497>${prefix}animal-gif** Rastgele Hayvan Gifi Atar!
        ** <a:ok1:824970054923452497>${prefix}marvel-gif** Rastgele Marvel Gifi Atar!
`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/735925634336817283/762342094554791936/ezgif.com-optimize_8-1.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Gif-menü'],
  permLevel: 0,
};

exports.help = {
  name: 'gif-menü',
  description: 'a!davet-sistemi Menüsü',
  usage: 'gif-menü'
};