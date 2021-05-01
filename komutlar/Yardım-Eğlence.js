const WestraDiscord = require('discord.js');
const WestraClient = new WestraDiscord.Client();
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix
let gif = ``

exports.run = (client, message) => {
 const WestraEmbed = new WestraDiscord.MessageEmbed()
  .setColor(0x36393F)
 .setAuthor(`${client.user.username} Eğlence Yardım Menüsü`)
 .setDescription(`
**${prefix}soygun-yap** \n<a:ok1:824970054923452497> Soygun Yaparsınız
**${prefix}düello**\n<a:ok1:824970054923452497> Birini Etiketleyip Düello Yaparsınız
**${prefix}aykutelmas**\n<a:ok1:824970054923452497> Aykut Elmas Sözlerini Atar
**${prefix}balık-tut**\n<a:ok1:824970054923452497> Her Çeşitten Balık Tutarsınız
**${prefix}tokat-at**\n<a:ok1:824970054923452497> Etiketlediğiniz Kişiye Tokat Atarsınız
**${prefix}fbi**\n<a:ok1:824970054923452497> FBI GIF Atar
**${prefix}espiri**\n<a:ok1:824970054923452497> Espiri Sözleri Atar
**${prefix}öp**\n<a:ok1:824970054923452497> Etiketlediğiniz Kişiyi Öpersiniz
**${prefix}boğazla**\n<a:ok1:824970054923452497> Etiketlediğiniz Kişiyi Boğazlarsınız
**${prefix}vine**\n<a:ok1:824970054923452497> Rastgele Vine Görselleri Atar
**${prefix}atatürk**\n<a:ok1:824970054923452497> Atatürk İle İlgili Gifler Atar
**${prefix}taksim-dayı**\n<a:ok1:824970054923452497> Taksim Dayı GIF Atar
**${prefix}araba**\n<a:ok1:824970054923452497> Araba Sürersin
**${prefix}iftar**\n<a:ok1:824970054923452497> İftar [ Şehir İsmi ] Not = İlk Harf Büyük Olsun
`)
 .setTimestamp()
 .setImage("https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif")
 message.channel.send(WestraEmbed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};