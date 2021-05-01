const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message) => {

message.channel.send("Balık Tuttun Balığı Çekiyorsun..").then(message => {

var matador = [

      "**Sazan Tuttun! 🎣**",
      "**Turna Tuttun! 🎣**",
      "**Vatoz Tuttun Bune Olum Sal Gitsin 🎣**",
      "**Köpek Balığı Tuttun İyi Para Eder Sat Sat :D :shark:**",
      "**Uskumru Tuttun! 🎣**",
      "**Mezgit Tuttun! Havyarıda Var hee ;) 🎣**",
      "**Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde? 🎣**",
      "**Hamsi Tuttun! 🎣**",
      "**Levrek Tuttun! 🎣**",
      "**Hiçbirşey Tutamadın Maalesef! :wastebasket:**",
      "**Alabalık Tuttun! 🎣**",
      "**Maalesef Balık Oltadan Kaçtı! :wastebasket:**",
      "**İstavrit Tuttun! 🎣**"

    ];

    var matador = matador[Math.floor(Math.random() * matador.length)];
    message.edit(`${matador}`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["balıktut"],
  permLevel: 0
};

exports.help = {
  name: "balık-tut",
  description: "Balık Tutarsın.",
  usage: "balıktut"
};
