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
       .setTitle(` **OneWoo Bot Logo Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **<a:ok1:824970054923452497>  ${prefix}alev**  alevli logo yapar
  **<a:ok1:824970054923452497>  ${prefix}alev2**  alevli logo yapar 
  **<a:ok1:824970054923452497>  ${prefix}gold **  goldlu logo yapar
  **<a:ok1:824970054923452497>  ${prefix}gökkuşak**  gökkuşak logo yapar
  **<a:ok1:824970054923452497>  ${prefix}neon**  neon logo yapar
  **<a:ok1:824970054923452497>  ${prefix}pembe**  pembe logo yapar
  **<a:ok1:824970054923452497>  ${prefix}altın **  altın logo yapar
  **<a:ok1:824970054923452497>  ${prefix}anime**  anime logo yapar
  **<a:ok1:824970054923452497>  ${prefix}google**  google logo yapar
  **<a:ok1:824970054923452497>  ${prefix}odun**  odun logo yapar
  **<a:ok1:824970054923452497>  ${prefix}ejderha** ejderha logo yapar
  **<a:ok1:824970054923452497>  ${prefix}cool** cool logo yapar
  **<a:ok1:824970054923452497>  ${prefix}buz** buz logo yapar
  **<a:ok1:824970054923452497>  ${prefix}gemi** gemi logo yapar 
  **<a:ok1:824970054923452497>  ${prefix}duckets** duckets logo yapar
  **<a:ok1:824970054923452497>  ${prefix}mekanik** mekanik logo yapar 
  **<a:ok1:824970054923452497>  ${prefix}fx** fx logo yapar
  **<a:ok1:824970054923452497>  ${prefix}metal** metal logo yapar 
  **<a:ok1:824970054923452497>  ${prefix}punk** punk logo yapar 
  **<a:ok1:824970054923452497>  ${prefix}sci-fi** sci-fi logo yapar
  **<a:ok1:824970054923452497>  ${prefix}siyah** siyah logo yapar
  **<a:ok1:824970054923452497>  ${prefix}taş** taş logo yapar
  **<a:ok1:824970054923452497>  ${prefix}vip** vip logo yapar
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['logomenü'],
  permLevel: 0,
};

exports.help = {
  name: 'logoyardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};
