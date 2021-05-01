const Discord = require("discord.js"); //DevTR | xFalcon
const client = new Discord.Client();
//DevTR
exports.run = (client, message) => {
  message.channel.send("**<:BildirimPng:807560291482075156> Atasözünü Buluyorum!**").then(message => {
    var xfalcon = [
      "Besle kargayı oysun gözünü.", //DevTR | xFalcon
      "Can çıkmayınca huy çıkmaz.", //DevTR | xFalcon
      "Damlaya damlaya göl olur.", //DevTR | xFalcon
      "Rüzgar eken fırtına biçer.", //DevTR | xFalcon
      "Perşembenin gelişi,çarşambadan bellidir.", //DevTR | xFalcon
      "Üzüm üzüme baka baka kararır.", //DevTR | xFalcon
      "Üzümün ye de bağını sorma.", //DevTR | xFalcon
      "Zahmetsiz rahmet olmaz.", //DevTR | xFalcon
      "Deliye her gün bayram.", //DevTR | xFalcon
      "Elden gelen övün olmaz , o da vaktinde gelmez.", //DevTR | xFalcon
      "Eşek hoşaftan ne anlar.", //DevTR | xFalcon
      "Fazla mal göz çıkarmaz.", //DevTR | xFalcon
      "Felek kimine kavun yedirir, kimine kelek.", //DevTR | xFalcon
      "Gülü seven dikenine katlanır.", //DevTR | xFalcon
      "Gülme komşuna gelir başına", //DevTR | xFalcon
      "Görünen köy kılavuz istemez.", //DevTR | xFalcon
      "Her horoz kendi çöplüğünde öter.", //DevTR | xFalcon
      "Her inişin bir yokşu vardır", //DevTR | xFalcon
      "Kedi uzanamadığı ciğere murdar der."//DevTR | xFalcon
    ]; //DevTR | xFalcon
    var devtr = xfalcon[Math.floor(Math.random() * xfalcon.length)]; //DevTR | xFalcon
    message.edit(`Atazözün: ${devtr}`); //DevTR | xFalcon
  });
}; //DevTR

exports.conf = {
  enabled: true, //DevTR | xFalcon
  guildOnly: false, //DevTR | xFalcon
  aliases: ["atasözüm", "random-atasözü"], //DevTR | xFalcon
  permLevel: 0 //DevTR | xFalcon
};

exports.help = { 
  name: "atasözü", //DevTR | xFalcon
  description: "Atasözü Bulmaya Çalışır", //DevTR | xFalcon
  usage: "atasözü"//DevTR | xFalcon
};