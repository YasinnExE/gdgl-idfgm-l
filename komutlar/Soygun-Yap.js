const Discord = require('discord.js');

const NeonSoygun = [
  "52 ABD Doları",
  "31 ABD Doları",
  "tüühh be polis geldi gaç!",
  "Kaçarken BitCoinler Yere Düştü Kazancın 0",
  "100 Dolar Soydun Ve Yanında Lokum Kazandın",
  "640 ABD Doları",
  "531 ABD Doları",
  "210 ABD Doları",
  "2.230 ABD Doları",
  "3.450 ABD Doları",
  "2.760 ABD Doları",
  "9.325 ABD Doları",
  "24.760 ABD Doları",
  "Banka Sahibinin Köpeğini Çaldın Nasıl Yaptın La Bunu",
  "Alarm Çaldı Buradan Tüyme Zamanı",
  "Olm 1 Dolar Ne Lan Geri Yerine Koy",
  "Salak Mehmet Yüzünden Hapisi Boyladık",
  "734.750 ABD Doları",
  "931.510 ABD Doları",
  "311.645 ABD Doları",
  "Lan Yavaş ATM'yi Yerinden Söktün WoooW Kaslı Abem",
];

exports.run = function(client, message) {
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  const soygun = NeonSoygun[Math.floor(Math.random() * NeonSoygun.length)];
  message.channel.send(

  "**ATM Yeri Haritada Aranıyor Az Sabırlı Ol**"

  ).then(
  function(i){
    i.edit("**ATM Bulundu Patlatma Zamanı**")
    message.edit(2 * 2500)
    i.edit(
    new Discord.MessageEmbed()
      .setTitle('**ATM Patlatıldı Şimdi Paraları Harcama Zamanı**')
    .setDescription('')
      .addField('**ATM Den Yaptığımız Vurgun Miktarı**',soygun)
    .setColor('RANDOM')


    )
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['soygun-yap'],
  permLevel: 0
};

exports.help = {
  name: 'soygun-yap',

  description: 'Soygun Yaparsınız',
    kategori: 'eğlence',
  usage: 'soygunyap'
}
