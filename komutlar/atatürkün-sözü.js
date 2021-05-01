const Discord = require("discord.js"); //DevTR | xFalcon
const client = new Discord.Client();
//DevTR
exports.run = (client, message) => {
  message.channel.send("**<:BildirimPng:807560291482075156> Atatürk'ün En Güzel Sözünü Buluyorum!**").then(message => {
    var xdeli = [
      "Hayatı ve özgürlüğü için ölümü göze alan bir millet asla yenilmez.",
      "Yurtta sulh, cihanda sulh.",
      "Şuna inanmak gerekir ki, dünya yüzünde gördüğümüz her şey kadının eseridir.",
      "Egemenlik verilmez, alınır.",
      "Hayatta en hakiki mürşit ilimdir.",
      "Bir ulus sanattan ve sanatçıdan yoksunsa, tam bir hayata sahip olamaz.",
      "Benim naçiz vücudum elbet bir gün toprak olacaktır, ancak Türkiye Cumhuriyeti ilelebet payidar kalacaktır.",
      "Gençler cesaretimizi takviye ve idame eden sizlersiniz. Siz, almakta olduğunuz terbiye ve irfan ile insanlık ve medeniyetin, vatan sevgisinin, fikir hürriyetinin en kıymetli timsali olacaksınız. Yükselen yeni nesil, istikbal sizsiniz. Cumhuriyeti biz kurduk, onu yükseltecek ve yaşatacak sizsiniz.",
      "Dünyada her şey için, medeniyet için, hayat için, başarı için, en hakiki mürşit bilimdir, fendir.",
      "Eğer bir gün benim sözlerim bilimle ters düşerse bilimi seçin.",
      "Hürriyet olmayan bir memlekette ölüm ve çöküş vardır. Her ilerleyişin ve kurtuluşun anası hürriyettir.",
      "Bir ulus, sımsıkı birbirine bağlı olmayı bildikçe yeryüzünde onu dağıtabilecek bir güç düşünülemez.",
      "Öğretmen bir kandile benzer, kendini tüketerek başkalarına ışık verir.",
      "Başarı tüm ulusun azim ve inancıyla çabasını birleştirmesi sonucu kazanabilir.",
      "Bir milletin medeniyetini ölçmek istiyor musunuz? Kadınlarına nasıl muamele edildiğine bakınız.",
      "Kültür zeminle orantılıdır. O zemin milletin seciyesidir."
    ];
    var doktor = xdeli[Math.floor(Math.random() * xdeli.length)];
    message.edit(`Baş Komutunamızdan Sana: \n**${doktor}**`); 
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["atatürk", "random-atatürk"],
  permLevel: 0 
};

exports.help = { 
  name: "atatürkün-sözü",
  description: "Atatürkten Söz Verir",
  usage: "atatürkün-sözü"
};