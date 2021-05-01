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
       .setTitle(` **OneWoo Bot Ekonomi Menüsüne Hoşgeldiniz** `)
        .setDescription(`
  **<a:ok1:824970054923452497> ${prefix}günlük**  \`24 saat aralıkla 2300-2700 arası para kazanırsınız.\`\n
  **<a:ok1:824970054923452497> ${prefix}hafta**  \`7 gün aralıkla 9200-10800 arası para kazanırsınız.\` \n
  ** <a:ok1:824970054923452497> ${prefix}para**  \`Etiketlediğiniz kişinin veya kendi paranızı görürsünüz.\`\n
  ** <a:ok1:824970054923452497> ${prefix}gönder**  \`Etiketlediğiniz kullanıcıya para gönderirsiniz.\`\n
  ** <a:ok1:824970054923452497> ${prefix}soygun**  \`14 dakikada bir soygun yaparsınız.\`\n
  ** <a:ok1:824970054923452497> ${prefix}çalış**  \`Rastgele bir işte çalışıp maaş alırsınız.\`\n
  ** <a:ok1:824970054923452497> ${prefix}yatır**  \`\Kendi cüzdanınızdan bankaya para yatırırsınız.\`\n
  ** <a:ok1:824970054923452497> ${prefix}pçek**  \`Bankadan kendi cüzdanınıza para çekersiniz.\`\n
  ** <a:ok1:824970054923452497> ${prefix}çal**  \`Etiketlediğiniz kişinin cüzdanından para çalarsınız.\`\n
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ekonomiyardım'],
  permLevel: 0,
};

exports.help = {
  name: 'ekonomisistemi',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};