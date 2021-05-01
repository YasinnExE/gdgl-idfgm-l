const Discord = require("discord.js")
const {MessageEmbed} = Discord
exports.run = async (client,message,args) =>{
  let yazı = args[0]
  if(!yazı) return message.channel.send(" Logo oluşturmak için bir yazı girmelisin.")
  let api = `https://dynamic.brandcrowd.com/asset/logo/055241ff-dc4f-4743-90be-1c9caa0c900b/logo?v=4&text=${yazı}`
  const embed = new MessageEmbed()
  .setColor("BLUE")
  .setImage(api)
  message.channel.send(embed)
}
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: 0,
    kategori: "logo",
   
      };
      
    exports.help = {
        name: 'ejderha',
        description: '',
        usage: '',
   
    };