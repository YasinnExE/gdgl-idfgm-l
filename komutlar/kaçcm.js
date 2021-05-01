const Discord = require('discord.js');
const data = require('quick.db');

exports.run = async (client, message, args) => {
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
  }
let slm = ['2', '4', '8', '12', '15', '20', '24', '26', '32', '38', '41', '54', '60'];
message.channel.send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`${message.author} **Hemen ölçüyoruz 1 saniye...**`)).then(m => {
setTimeout(() => {
m.edit(new Discord.MessageEmbed().setDescription(`${message.author} **Malafatın __${slm.random()}CM__ 🍆**`))
}, 4500)
})

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'kaçcm'
};  