const Discord = require('discord.js')
const fs = require('fs');
const ms = require("ms")
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
if (!message.guild) {
  
const ozelmesajuyari = new Discord.MessageEmbed()

.setColor('Black')
.setAuthor(message.author.username, message.author.avatarURL)
.addField('Uyarı', '`!sunucutanıt` Adlı Komutu Özel Mesajlarda Kullanamazsın.')

return message.author.sendEmbed(ozelmesajuyari); 
}
  
if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("Bu Komutu kullanmanız için `Sunucu_Yönet` Yetkisine sahip olmalısınız.")

let kullanildii = JSON.parse(fs.readFileSync('./sunucutanıt.json', 'utf8'));
  
if (!kullanildii[message.guild.id]) kullanildii[message.guild.id] = { gunlukkullanim: 0 }
if (kullanildii[message.guild.id].gunlukkullanim == 0) {
  
const embed = new Discord.MessageEmbed()

.setTitle('Başarılı')
.setColor('GREEN')

.setDescription('Sunucu https://discord.gg/QHXRtnsVtZ Tanıtıldı! \n\n 12 Saat Sonra Sunucunuzu Tekrardan Tanıtabilirsiniz. \n\n Sunucunu Tanıtabilmek İçin Beni [Ekle!](https://discord.com/oauth2/authorize?client_id=798574936988844033&scope=bot&permissions=8)')
 
message.channel.send('<a:ok1:824970054923452497> Başarılı Şekilde Paylaşıldı. \n\n **Sunucun Burda Tanıtıldı** (https://discord.gg/QHXRtnsVtZ')
  
message.channel.createInvite({maxAge: 0}).then((invite) => {
  
const embed = new Discord.MessageEmbed()

.setColor('GREEN')
.addField(` Sunucu Sahibi`, message.author.tag, true)
.addField(` Sunucu İsmi`, message.guild.name, true)
.addField(` Sunucu Davet Linki`, invite.url, true)
.setThumbnail(message.guild.iconURL)
.setImage(`https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif`)

client.channels.cache.get('825460063329714207').send(embed) //Kanal İd
});
  
kullanildii[message.guild.id].gunlukkullanim = 1
    
fs.writeFile('./sunucutanıt.json', JSON.stringify(kullanildii), (err) => {
  
if (err) console.error(err)
})
  
return
}
  
setTimeout(async() => {
kullanildii[message.guild.id].gunlukkullanim = 0
  
fs.writeFile('./sunucutanıt.json', JSON.stringify(kullanildii), (err) => {
  
if (err) console.error(err)
})}, ms('12h'));
  
if (kullanildii[message.guild.id].gunlukkullanim == 1) {
  
const embed = new Discord.MessageEmbed()  
  
.setColor('RED')
.setDescription('**Başarısız Tanıtım** \n\n Bu Komut Zaten Kullanılmış! \n\n Sunucunu 12 Saate 1 Defa Tanıtabilirsin! \n[Destek İçin ](https://discord.gg/QHXRtnsVtZ)')

message.channel.send(embed) 
};
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucu-tanıt'],
    permLevel: 2,
}
exports.help = {
    name: 'sunucutanıt',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}