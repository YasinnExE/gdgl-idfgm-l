const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {

message.channel.send(new Discord.MessageEmbed().setColor('#000001').setTitle('OneWoo Ses & Chat Mute').setDescription(`
\`${client.ayarlar.prefix}mute [@üyeEtiket] 1m\`
**Yazılı kanallarda mutelemek için kullanılır**

\`${client.ayarlar.prefix}sesmute [@üyeEtiket] 1m\`
**Sesli odalarda mutelemek için kullanılır**

\`${client.ayarlar.prefix}unmute [@üyeEtiket]\`
**Yazılı kanaldan mute kaldırır**

\`${client.ayarlar.prefix}unsesmute [@üyeEtiket]\`
**Sesli susturmayı kaldırır**
\`\`\`Kurulum Komutları\`\`\`
\`${client.ayarlar.prefix}muteyetki-role [@rolEtiket]\`
**Muteliyecek yetkili rolünü etiketleyerek aktif yaparsınız**

\`${client.ayarlar.prefix}ses-muteyetki-role [@rolEtiket]\`
**Sesli muteliyecek yetkili rolünü etiketleyerek aktif yaparsınız**

\`${client.ayarlar.prefix}mute-log [#kanalEtiket]\`
**Mute bilgilerinin yazılacağı kanalı etiketleyiniz**
\`\`\`Ayarları Sıfırlama Komutları\`\`\`
\`${client.ayarlar.prefix}muteyetki-sil\`
**Ayarlı olan mute yetki rolünü sıfırlar**

\`${client.ayarlar.prefix}ses-muteyetki-sil\`
**Ayarlı olan ses mute yetki rolünü sıfırlar**

\`${client.ayarlar.prefix}mute-log-kapat\`
**Ayarlı olan mute kanalını sıfırlar**`)
.setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : ''));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'mute-sistem'
};