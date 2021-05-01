const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '').setImage('').setTitle('Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}sunucudan-ayrıl\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**`).addField('Sunucu Sahibi', message.guild.owner.user.tag).setImage(''));

message.channel.send(new Discord.MessageEmbed()
.setTitle(client.user.username)
.setFooter(message.author.username, message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '')
.setDescription(`${message.author} **Kurulum ayarlarınız sıfırlanarak sunucudan ayrılmasını onaylıyor musun?** 😇`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

yes.on('collect', () => {
message.channel.send(new Discord.MessageEmbed().setDescription('**Sunucunuzdan ayrılıyorum. Kullandığınız için teşekkürler.**')).then(() => message.guild.leave());
});
no.on('collect', () => {
resulter.delete();
});
});

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'sunucudan-ayrıl'
};