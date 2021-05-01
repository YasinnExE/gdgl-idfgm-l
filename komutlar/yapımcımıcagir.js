const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
   let devtr = args.slice(0).join(' ');
   
  if (!devtr) return message.reply('<:ReddetmekPng:807560290035564605> **Sahibimi çağırmam için bir sebep gir!**')
  if (devtr.length < 7) return message.channel.send("<:ReddetmekPng:807560290035564605> **Sebebiniz Daha Bilgilendirici Olması İçin **En Az 7** Karakterli Olmalıdır!**");
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {

    message.channel.send("**<:OnayPng:807560289196179486> | Sahibime Mesajını İlettim!**")
    let xfalcon = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.avatarURL()}`)
    .setTitle('Biri Seni Yardım İçin Çağırdı')
    .addField('Sebep:', `${devtr}`)
    .addField(`Sunucunun Davet Linki:`, `${invite}`)
    .setThumbnail(message.guild.iconURL())
    .setFooter('OneWoo Yapımcıyı Çağırma Sistemi');
    client.users.cache.get(ayarlar.sahip).send(xfalcon);
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yapımcıyı-çağır"],
  permLevel: 0
};

exports.help = {
  name: 'çağır',
  description: 'Yapımcıyı Sunucuya Çağırır.',
  usage: 'çağır'
};