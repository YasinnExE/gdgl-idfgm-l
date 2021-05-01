const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
  
           let muterol = db.fetch(`muterol_${message.guild.id}`)
           
    if (!message.member.hasPermissions ('MANAGE_MESSAGES')) return message.channel.send("Yapmak İçin Mesajları Yönet Yetkisine Sahip Olmalısın.")
    const mod = message.author;
    let guild = message.guild
    if (!message.guild.roles.get(muterol)) return message.reply("Herhangi bir rol ayarlanamış! Ayarlamak için: **!mute-rol-ayarla @rol**")
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`Kullanıcı Bulunamadı`))
    let modlog = guild.channels.find('name', 'ceza-takip');
   if (!modlog) return message.reply('`ceza-takip` kanalını bulamıyorum.');
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor("Hata").setDescription(`Mute sebebini yazmalısın!`))

 
user.addRole(muterol)

           
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Eylem: Susuturma')
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField('Sebep', `${reason}`)
            .addField('Yetkili', `${mod}`)
            .setColor('RANDOM')
  return guild.channels.get(modlog.id).send(muteembed);
}


exports.conf = {
    enables: true,
   guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "mute"
}