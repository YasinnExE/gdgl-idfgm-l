const { MessageEmbed, MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

  let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!args[0]) return message.reply("Lütfen bir kullanıcı etiketleyin!")
  if (kullanıcı.id === message.author.id) return message.reply("Kendini mi boğazlayacaksın?")
  if (kullanıcı.id === client.user.id) return message.reply("Kendimi boğazlayamam!")
  kullanıcı = kullanıcı.user
  let link = `https://api.devs-hub.xyz/grab?image=${kullanıcı.avatarURL({ format: "png", size: 1024 })}`;

  const ek = new MessageAttachment(link, `grab.png`);

  const embed = new MessageEmbed()
    .setColor(`RANDOM`)
    .attachFiles(ek)
    .setImage(`attachment://grab.png`)
    .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL({ dynamic: true }))
    .setTitle(`${kullanıcı.tag} başarıyla boğazlandı!`)
    .setTimestamp();

  message.channel.send(embed)
  return
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  permLevel: 0,
  kategori: "eğlence",
  aliases: []
};

exports.help = {
  name: "boğazla",
  description: "Bir kişiyi boğazlarsınız",
  usage: "boğazla @kişi"
};