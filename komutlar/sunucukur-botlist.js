const Discord = require('discord.js');
const data = require('croxydb');


exports.run = async (client, message, args) => {
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(
new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : '')
.setColor('#f6ff00')
.setTitle('Bir hata oldu!').setDescription(`• \`sunucukur-botlist\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**`)
.addField('Sunucu Sahibi', message.guild.owner.user.tag));

message.channel.send(new Discord.MessageEmbed()
.setColor('#f6ff00')
.setTitle('Botlist Tema')
.setThumbnail('')
.setFooter(`Ping: ${client.ws.ping.toFixed(0)}`, client.user.avatarURL({dynamic: true}))
.setDescription(`${message.author} **Sunucunun** kurulmasını onaylıyor musun? 😇

**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord dan çıkıp girin düzelir.`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

yes.on('collect', async reaction => {
message.guild.roles.cache.filter(a => !a.managed && a.name !== '@everyone' && a.position < message.guild.members.cache.get(client.user.id).roles.highest.position).forEach(role => role.delete('ok boomer') && console.log(role.name+' silindi sqrt'));
message.guild.channels.cache.forEach(a => a.delete());

message.guild.roles.create({ data: { name: 'Kurucu' }, reason: 'ayn' }).then(s => s.setColor('#ff56ff'))
message.guild.roles.create({ data: { name: 'Projeler' }, reason: 'ayn' }).then(s => s.setColor('#2efef7'))
message.guild.roles.create({ data: { name: 'Developer' }, reason: 'ayn' }).then(s => s.setColor('#f4fa58'))
message.guild.roles.create({ data: { name: 'Sertifikalı Botlar' }, reason: 'ayn' }).then(s => s.setColor('#f6ff00'))
message.guild.roles.create({ data: { name: 'Botlar' }, reason: 'ayn' }).then(s => s.setColor('#955aab'))
message.guild.roles.create({ data: { name: 'Üyeler' }, reason: 'ayn' }).then(s => s.setColor('#2e9afe'))

message.guild.channels.create('ÖNEMLİ KANALLAR', {type: 'category'}).then(parent => {
message.guild.channels.create('📕・kurallar', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📣・duyurular', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📌・bot-ekletme-şartları', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🤖・bot-ekle', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🌐・bot-log', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('METİN KANALLARI', {type: 'category'}).then(parent => {
message.guild.channels.create('💬・sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🤖・bot-komut', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📸・foto', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔧・hata-yardım', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('BOT TEST KANALLARI', {type: 'category'}).then(parent => {
message.guild.channels.create('🔨・bot-test-1', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔨・bot-test-2', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔨・bot-test-3', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔊・bot-test-ses-1', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('🔊・bot-test-ses-2', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
});
});

no.on('collect', async reaction => {
resulter.delete();
});

})


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'sunucukur-botlist'
};