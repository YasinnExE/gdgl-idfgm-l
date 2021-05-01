const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;
let guild = message.guild.name;
let guildid = message.guild.id;
let kanal = message.channel.name;
let channel = bot.channels.cache.get("828999711767003136")//bug repot kanal id'i
let embed = new Discord.MessageEmbed()
.setTitle("Bug Report")
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.addField("Bug", bug)
.addField("Report Eden", user, true)
.addField("Sunucu", guild, true)
.addField("Sunucu ID", guildid, true)
.addField("Kanal", kanal, true)
.setColor("#YELLOW")

message.channel.send("**Bug Report Başarı İle İletildi.**")
channel.send(embed).then(i => i.react("✔"))

  


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0  
};

exports.help = {
  name: 'bug-bildir',
  description: 'Çalışıp para kazanırsınız.',
  usage: 'bug-bildir'
}