const Discord = require("discord.js");
const moment = require('moment');

module.exports.run = async (client, message, args) => {
  const ok = message.client.emojis.cache.get("");
           var doktor = new Discord.MessageEmbed()
                .setAuthor('#' + message.channel.name, message.guild.iconURL)
                .addField(" ID", message.channel.id)
                if (message.channel.nsfw) {
                    doktor.addField(" Uygunsuz İçerik", "Evet", true)
                }
                else {
                    doktor.addField(" Uygunsuz İçerik", "Hayır", true)
                }
                doktor.addField('Oluşturulduğu Tarih:', moment(message.channel.createdAt).format('DD/MM/YYYY'), true)
                .setColor(3447003)
                .setThumbnail(message.guild.iconURL)
                .setFooter('Doktor Kanal Bilgi', client.user.avatarURL)
            message.channel.send(doktor)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kanal bilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kanalbilgi',
  description: 'Kanal ile ilgili bilgi verir.',
  usage: 'kanalbilgi'
}