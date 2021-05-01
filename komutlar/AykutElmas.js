const Discord = require("discord.js");

exports.run = async (client, message, args) => {
///////////////////////////
  var sözler = [
   "Nasipte Varsa",
   "Hocam Aykut Uç Yiyo",
   "Yavaş La Gaç Tane Alıyon",
   "Oosman Gültekin Sen Misin?",
   "Ay have gat a vane pensıl",
   "Kudurdum.com bu kadar ?",
   "Ayağına Nazar Değmesin",
   "Çocuklar piknik için neler getirdiniz?",
   "Yirmi beş mi oldun öp bakem elimi",
   "Herkesin bi ayfonu bi benim yok",
   "ŞİRİN BABAYI SİLK",
    "Yes ay dozont",
    "Bamya yaptım oğlum.",
    "Osman seni çizdim he.",
    "Banağ para ver, banağ paraa veeerğ",
    "Ne demek kızın yaşı anneden büyük olamaz, bizim zamanımızda oluyordu.",
    "Pisuvara kim sıçtı?",
    "Sen yanlış yapmadın soru yanlışmış yeaww",
    "Yav oyun gitti niye çekiyon fişi.",
    "Yalnız çıkışta görüşürüz hocam hani böyle sınıf ortamında..."
     ]
     var veritabanı = sözler[Math.floor(Math.random() * (sözler.length))]

     var resim = [
      "https://media.discordapp.net/attachments/789023023918743562/803020375171923998/unknown.png",
      "https://media.discordapp.net/attachments/789023023918743562/803020339122143272/unknown.png",
      "https://media.discordapp.net/attachments/789023023918743562/803020844527517726/unknown.png",
      "https://media.discordapp.net/attachments/789023023918743562/803020902891388959/unknown.png"
        ] 
        var görsel = resim[Math.floor(Math.random() * (resim.length))]  
///////////////////////////
const vrs = new Discord.MessageEmbed()
.setColor("RED")
.setThumbnail(`${görsel}`)
.setTitle("Aykut Elmas Diyor Ki:")
.setDescription(`${veritabanı}`)
message.channel.send(vrs);
///////////////////////////
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["aykut-elmas"],
  permLevel: 0
};

exports.help = {
  name: "aykutelmas"
};