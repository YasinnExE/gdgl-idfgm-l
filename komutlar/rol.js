const Discord = require("discord.js");
const db = require('quick.db')

exports.run = async (client, message, args) => {
	
	//
	     if (!db.has(`premod_${message.guild.id}`) == true) {
    
      const westrabumbeyyy = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`<:ReddetmekPng:807560290035564605> Bu sunucuda premium mod aktif değil. Bu yüzden bu komutu kullanamazsınız.`)
      return message.channel.send(westrabumbeyyy)

    
  } else {
  
	//
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('<:ReddetmekPng:807560290035564605> Bu komuta erişim sağlamak için ``ADMINISTRATOR`` yetkisine sahip olmalısın.')

let data = await db.fetch(`rol_${message.guild.id}`)
if(args[0] !== "ayarla" &&  args[0] !== "ver" &&  args[0] !== "al" &&  args[0] !== "sıfırla") return message.channel.send("<:ReddetmekPng:807560290035564605> **ayarla**, **ver** , **al** ya da **sıfırla** olarak seçenek belirtmelisin.")

if(args[0] === "ayarla") {
if(data) return message.channel.send("<:ReddetmekPng:807560290035564605> Verilecek/alınacak rol daha önce ayarlanmış.")
let rol = message.mentions.roles.first()
if(!rol) return message.channel.send("<:ReddetmekPng:807560290035564605> Rol belirtmelisin.")
db.set(`rol_${message.guild.id}`, rol.id)
message.channel.send('<:OnayPng:807560289196179486> Alınacak/verilecek rol <@&'+rol+'> olarak ayarlandı.')
return
}

if(args[0] === "ver") {
if(!data) return message.channel.send('<:ReddetmekPng:807560290035564605> Alınacak/verilecek rol ayarlanmamış.')
let rol = await db.fetch(`rol_${message.guild.id}`);
let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
if (!user) return message.channel.send('<:ReddetmekPng:807560290035564605> Kullanıcı etiketlemelisin.')
user.roles.add(rol); 
message.channel.send('<:OnayPng:807560289196179486> Ayarlanan <@&'+rol+'> adlı rol <@'+user+'> adlı kullanıcıya verildi.')
return
}

if(args[0] == "al") {
if(!data) return message.channel.send('<:ReddetmekPng:807560290035564605> Alınacak/verilecek rol ayarlanmamış.')
let rol = await db.fetch(`rol_${message.guild.id}`);
let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
if (!user) return message.channel.send('Kullanıcı etiketle')
user.roles.remove(rol);
message.channel.send('<:OnayPng:807560289196179486> Ayarlanan <@&'+rol+'> adlı rol <@'+user+'> adlı kullanıcıdan alındı.')
return      
}
 if(args[0] == "sıfırla") {
if(!data) return message.channel.send('<:ReddetmekPng:807560290035564605> Verilecek/alınacak rol ayarlanmamış.')
db.delete(`rol_${message.guild.id}`)
message.channel.send('<:OnayPng:807560289196179486> Verilecek/alınacak rol sıfırlandı.')
return
}
}
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
}; 

exports.help = {
name: 'rol',
}
 