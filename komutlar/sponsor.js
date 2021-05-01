const WestraDiscord = require('discord.js');
const WestraClient = new WestraDiscord.Client();
const ayarlar = require('../ayarlar.json');
let prefix = ayarlar.prefix

exports.run = (client, message) => {
  
 const WestraEmbed = new WestraDiscord.MessageEmbed()
  
 .setColor(0x36393F)
 .setAuthor(`Sponsor`)
.setDescription(`
Sponsorumuz = <@789244467752075284> 

**Sponsorumuzun Bazı İstekleri Vardır Her Serverde Kural Vardır Ya İşte Sponsorluklardada Bazı Kurallar Var.**

1 = [Oy Ver](https://top.gg/bot/830797432463032370/vote)

2 = [Tıkla](https://discord.gg/SwpHQtxVdG)

3 = [Botu Ekle](https://discord.com/oauth2/authorize?client_id=830797432463032370&permissions=8&scope=bot)

**Sponsor Olmak İstersen;**

[Sponsor Olmak İçin Tıkla](https://discord.gg/P67pQ5aYfT)
`)
 .setImage("")
 .setTimestamp()
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
  name: 'sponsor',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};