const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if(command == '') return;
const pixel = new Discord.MessageEmbed()
.setDescription("Botta `" + command + '` Adında Bir Komut Bulunamadı.')
.setColor('#2c2f33')
.setTimestamp()
    message.reply(pixel)//jkood
  }
  }
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if(command == '') return;
const pixel = new Discord.MessageEmbed()
.setDescription("Botta `" + command + '` Adında Bir Komut Bulunamadı.')
.setColor('#2c2f33')
.setTimestamp()
    message.reply(pixel)//jkood
  }
  }
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
	//
	 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const westraben = new Discord.MessageEmbed()
 .setColor(`RED`)
 .setDescription(`<a:redke:763316512937082890> **${karaliste}** sebebiyle karalisteye alınmışsın!\nBeyaz listeye alınmak istiyorsan [Buraya](https://discord.gg/A4VHQNN5Cv) gelebilirsin!`)
  if(karaliste) return message.channel.send(westraben)
	//
    cmd.run(client, message, params, perms);
  }
};


module.exports = async message => {
let CodeWork = db.fetch(`CodeWork.botbakim`)
  let client = message.client;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
  if(message.author.id !== ayarlar.sahip && CodeWork) return message.channel.send(`<a:dyru:825007122899009537>  Bot şuan bakımdadır, lütfen sahibim açana kadar beklemede kalınız.`)
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};

