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
       .setTitle(` **OneWoo Bot Moderasyon Menüsüne Hoşgeldiniz**`)
        .setDescription(`
  **»<a:ok1:824970054923452497>  ${prefix}mod-log**  Mod-Log Kanalını Belirlersiniz.
  **»<a:ok1:824970054923452497>  ${prefix}mod-log kapat**  Ayarlanan Mod-Log Kanalı Kapatılır.
  **»<a:ok1:824970054923452497>  ${prefix}oylama **  Oylama Yaparsınız
  **»<a:ok1:824970054923452497>  ${prefix}yasaklı-tag **  Yasaklı Tag Ayarlar.
  **»<a:ok1:824970054923452497>  ${prefix}otorol-ayarla**  Otorol Ayarlar.
  **»<a:ok1:824970054923452497>  ${prefix}otorolkapat**  Otorol Kapatır.
  **»<a:ok1:824970054923452497>  ${prefix}sayaç-ayarla**  Sayaç Ayarlar.
  **»<a:ok1:824970054923452497>  ${prefix}sayaç-kanal-ayarla**  Sayaç Kanal Ayarlar.
  **»<a:ok1:824970054923452497>  ${prefix}ban **  Etiketlenen Kullanıcıyı Banlar.
  **»<a:ok1:824970054923452497>  ${prefix}kick **  Etiketlenen Kullanıcıyı Kickler.
  **»<a:ok1:824970054923452497>  ${prefix}sa-as aç **  SA-AS Sistemini Açar.
  **»<a:ok1:824970054923452497>  ${prefix}sa-as kapat **  SA-AS Sistemini Kapatır.
  **»<a:ok1:824970054923452497>  ${prefix}emoji-ekle **  Emoji Ekler.
  **»<a:ok1:824970054923452497>  ${prefix}çekiliş **  Çekiliş yaparsınız.
`)
        .setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)
        .addField(`» OneWoo Bot Bağlantıları`, ` :dash:  [Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/Ts4twkEDhW) :dash: `)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Moderasyon2'],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon2',
  description: 'a!davet-sistemi Menüsü',
  usage: 'moderasyon'
};