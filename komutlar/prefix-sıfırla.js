const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
  let kontrol = await db.fetch(`dil_${message.guild.id}`);
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (kontrol == "yokagayok") {

        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`<:ReddetmekPng:807560290035564605> Prefix zaten ayarlanmamış!`)
            .setFooter(client.user.username, client.user.avatarURL());

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<:OnayPng:807560289196179486> Prefix başarıyla sıfırlandı!`)
          .setFooter(client.user.username, client.user.avatarURL());

        message.channel.send(embed);
        db.delete(`prefix_${message.guild.id}`);
      
  } else {
    
        if (!prefix) {
          const embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setDescription(`<:ReddetmekPng:807560290035564605> Prefix Zaten Ayarlanmamış!`)
            .setFooter(client.user.username, client.user.avatarURL());

          message.channel.send(embed);
          return;
        }
        const embed = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<:OnayPng:807560289196179486> Prefix Başarıyla Sıfırlandı!`)
          .setFooter(client.user.username, client.user.avatarURL());

        message.channel.send(embed);
        db.delete(`prefix_${message.guild.id}`);
      
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["prefix-reset"],
  permLevel: 3,
  kategori: "sunucu"
};

module.exports.help = {
  name: "prefix-sıfırla",
  description: "prefix-sıfırla",
  usage: "prefix-sıfırla"
};
