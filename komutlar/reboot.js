const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
const db = require("quick.db")//Ϫ Halil'M#7403
require("moment-duration-format");//Ϫ Halil'M#7403
//Ϫ Halil'M#7403
exports.run = async (bot, message, args) => { //Ϫ Halil'M#7403
  if(message.author.id !== '627543270985170958') return message.channel.send("<a:dnya:824970043062091776> Dostum Bunu Tek Benim Yaratıcım Kuullanabilir Üzgünüm.");//Ϫ Halil'M#7403
   db.set(`Bot Yeniden Başlıyor.`, "ack")
   db.set(`rebootkanal`,message.channel.id)
  message.reply("Bot Yeniden Başlatılıyor! Lütfen bekleyiniz").then(msg => {
    console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
  })
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 0
};
 
exports.help = {
  name: "reboot2",
  description: "botu yeniden başlatır",
  usage: "!r"
};