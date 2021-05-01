const Discord = require("discord.js");

const codare1 = require("quick.db");

exports.run = (client, message, args) => {

if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`Bu komutu kullanabilmek için \`MANAGE_GUILD\` yetkisine sahip olman gerekli!`)

  let codare = args.slice(0).join(" ");

  if (!codare)

    return message.channel.send("Lütfen bir tag girin!")

  codare1.set(`ototag.${message.guild.id}`, tag);

  message.channel.send(`Oto tag \`${codare}\` Olarak Ayarlandı. \nNot: Tagınız 5 karakterden büyük olursa botunuzda hata olabilir!`);

}

exports.conf = {

   enabled: true,

   guildOnly: false,

   aliases: [],

   permlevel: 0

}

exports.help = {

  name: "ototag",

  description: 'Sunucuya katılan kullanıcılara oto tag verebilirsiniz.',

  usage: 'ototag <tag>'

}