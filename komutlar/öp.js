const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let mesaj = args.slice(0).join(" ");
  if (mesaj.length < 1) return message.channel.send("Kimi öpeceksin?");

const Embedmatador = new Discord.MessageEmbed()

    .setAuthor(" ")
    .setColor(`ORANGE`)
    .setDescription(
      message.author.username +
        ` **adlı kullanıcı, ${mesaj} adlı kullanıcıyı öptü.**`
    )

    .setImage(
               `https://media.tenor.com/images/39fe167bdab90223bcc890bcb067b761/tenor.gif`
 );
  return message.channel.send(Embedmatador);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "eğlence",
  permLevel: 0
};

exports.help = {
  name: "öp",
  description: "İstediğiniz kişiyi öpersiniz.",
  usage: "öp"
};
