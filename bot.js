const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");


//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Aktif");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(``);
}, 280000);
//-----------------------------------------------\\

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

///==========komutlar==========\\\
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    let songelen =  member.guild.channels.cache.find(x =>(x.name).startsWith("Son Üye • "))
   
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
      songelen.setName(`Son Üye • ${member.user.username}`)
   } catch(e) { }
  }
})
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.cache.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.cache.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.cache.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.cache.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.cache.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.cache.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.cache.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.cache.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.cache.filter(m => m.user.bot).cache.size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
    
   } catch(e) { }
  }
})
client.on('guildMemberAdd', async member => {
  
  let devtr_kod = await db.fetch(`devtr_oto_tag_${member.guild.id}`);
  let devtr1;
  if (devtr_kod == null) devtr1 = member.setNickname(`${member.user.username}`)
  else devtr1 = member.setNickname(`${devtr_kod} ${member.user.username}`)
});
//ototag sistemi //




client.on('guildMemberAdd', async member => {

  

  let emran = await db.fetch(`ototag.${member.guild.id}`);

  let tanersins;

  if (emran == null) tanersins = member.setNickname(`${member.user.username}`)

  else tanersins = member.setNickname(`${emran} ${member.user.username}`)

});
// Reklam Engel //
////reklam-engel

const reklam = [
        ".com",
        ".net",
        ".xyz",
        ".tk",
        ".pw",
        ".io",
        ".me",
        ".gg",
        "www.",
        "https",
        "http",
        ".gl",
        ".org",
        ".com.tr",
        ".biz",
        "net",
        ".rf",
        ".gd",
        ".az",
        ".party",
		".gf"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`reklam.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`reklam.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (reklam.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${nev.author} , **Mesajını Editleyerek Reklam Yapmaya Çalıştı!**`)
            .addField("Reklamı:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${nev.author} , **Mesajı Editleyerek Reklam Yapamana İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`reklam.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`reklam.${msg.member.guild.id}.durum`);
          if (i) {
              if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> <@${msg.author.id}> , **Bu Sunucuda Reklam Yapmak Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${msg.author} , **Reklam Yapmaya Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});


//reklam engel son //
//küfür engel //
const küfür = [
        "siktir",
        "fuck",
        "puşt",
        "pust",
        "piç",
        "sikerim",
        "sik",
        "yarra",
        "yarrak",
        "amcık",
        "orospu",
        "orosbu",
        "orosbucocu",
        "oç",
        ".oc",
        "ibne",
        "yavşak",
        "bitch",
        "dalyarak",
        "amk",
        "awk",
        "taşak",
        "taşşak",
        "daşşak",
		"sikm",
		"sikim",
		"sikmm",
		"skim",
		"skm",
		"sg"
      ];
client.on("messageUpdate", async (old, nev) => {
  
    if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
   if (i) {
      
      if (küfür.some(word => nev.content.includes(word))) {
      if (nev.member.hasPermission("BAN_MEMBERS")) return ;
       //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
 const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${nev.author} , **Mesajını Editleyerek Küfür Etmeye Çalıştı!**`)
            .addField("Küfür:",nev)
        
            nev.delete();
            const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${nev.author} , **Mesajı Editleyerek Küfür Etmene İzin Veremem!**`) 
          client.channels.cache.get(y).send(embed)
            nev.channel.send(embeds).then(msg => msg.delete({timeout:5000}));
          
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async msg => {

     
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
         let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);
   
    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
          if (i) {
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                 if (!msg.member.hasPermission("MANAGE_GUILD")) {
                 //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
     msg.delete({timeout:750});
                    const embeds = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> <@${msg.author.id}> , **Bu Sunucuda Küfür Yasak!**`)
      msg.channel.send(embeds).then(msg => msg.delete({timeout: 5000}));
                const embed = new Discord.MessageEmbed() .setColor("#ff7e00") .setDescription(`<:ReddetmekPng:807560290035564605> ${msg.author} , **Küfür Etmeye Çalıştı!**`) .addField("Mesajı:",msg)
               client.channels.cache.get(y).send(embed)
                  }              
                } catch(err) {
                  console.log(err);
                }
              }
          }
         if(!i) return ;
});

//küfür engel son //
// canvaslı giriş //

//resimli hg-bb

client.on("guildMemberRemove", async member => {
  
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
    if (!canvaskanal) return;
  
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucudan Ayrıldı."];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
  
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `{uye}, ${randomMsg_integer}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "https://i.hizliresim.com/Wrn1XW.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "https://i.hizliresim.com/Wrn1XW.jpg"
    );
  
      canvaskanal.send(attachment);
      canvaskanal.send(
        msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
      );
      if (member.user.bot)
        return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
    
  });
  
  client.on("guildMemberAdd", async member => {
    if (db.has(`gçkanal_${member.guild.id}`) === false) return;
    var canvaskanal = member.guild.channels.cache.get(db.fetch(`gçkanal_${member.guild.id}`));
  
    if (!canvaskanal || canvaskanal ===  undefined) return;
    const request = require("node-superfetch");
    const Canvas = require("canvas"),
      Image = Canvas.Image,
      Font = Canvas.Font,
      path = require("path");
  
    var randomMsg = ["Sunucuya Katıldı."];
    var randomMsg_integer =
      randomMsg[Math.floor(Math.random() * randomMsg.length)];
  
    let paket = await db.fetch(`pakets_${member.id}`);
    let msj = await db.fetch(`cikisM_${member.guild.id}`);
    if (!msj) msj = `{uye}, ${randomMsg_integer}`;
  
    const canvas = Canvas.createCanvas(640, 360);
    const ctx = canvas.getContext("2d");
  
    const background = await Canvas.loadImage(
      "https://i.hizliresim.com/UyVZ4f.jpg"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = `#D3D3D3`;
    ctx.font = `37px "Warsaw"`;
    ctx.textAlign = "center";
    ctx.fillText(`${member.user.username}`, 300, 342);
  
    let avatarURL = member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }) ;
    const { body } = await request.get(avatarURL);
    const avatar = await Canvas.loadImage(body);
  
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(avatar, 250, 55, 110, 110);
  
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "ro-BOT-hosgeldin.png"
    );
  
    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  });
//canvaslı giriş son //


//////////////
/////////////////////////////////////////////////kanal-koruma
//KanalKoruma
client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})


// SAYAÇ SİSTEMİ

client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<:OnayPng:807560289196179486> `" +
          member.user.username +
          "`**Adlı Kullanıcı Aramıza Katıldı!** `" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        `<:OnayPng:807560289196179486> **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
    await db.delete(`sayacK_${member.guild.id}`);
    await db.delete(`sayacS_${member.guild.id}`);
    await db.delete(`sayacHG_${member.guild.id}`);
    await db.delete(`sayacBB_${member.guild.id}`);
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(
        "<:ReddetmekPng:807560290035564605> `" +
          member.user.username +
          "` **Adlı Kullanıcı Aramızdan Ayrıldı.**`" +
          sayaç +
          "` **Kişi Olmamıza** `" +
          sonuç +
          "` **Kişi Kaldı.** `" +
          member.guild.memberCount +
          "` **Kişiyiz!**"
      );
  }

  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});
/// YASAKLI TAG

client.on("guildMemberAdd", async member => {
  let guild = member.guild;
  let user = guild.members.cache.get(member.id);

  const tag = await db.fetch(`banned-tag.${guild.id}`);
  const sayı = await db.fetch(`atıldın.${guild.id}.${user.id}`);
  if (user.user.username.includes(tag)) {
    if (sayı === null) {
      await db.add(`atıldın.${guild.id}.${user.id}`, 1);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atıldınız, tekrar giriş yapmayı denerseniz **yasaklanacaksınız**!`
          )
      );
      await user.kick();
    }

    if (sayı === 1) {
      await db.delete(`atıldın.${guild.id}.${user.id}`);
      user.send(
        new Discord.MessageEmbed()
          .setColor("RED")
          .setAuthor(guild.name, guild.iconURL)
          .setDescription(
            `Sunucumuzun yasaklı tagında bulunduğunuz için atılmıştınız, tekrar giriş yapmayı denediğiniz için **${guild.name}** sunucusundan kalıcı olarak **yasaklandınız**!`
          )
      );
      await user.ban();
    }
  }
});


//YASAKLI TAG
//OTOROL SİSTEMİ

client.on("guildMemberAdd", async member => {
  
 let kanal = db.fetch(`judgekanal_${member.guild.id}`)   
 let rol = db.fetch(`judgerol_${member.guild.id}`)
 let mesaj = db.fetch(`judgemesaj_${member.guild.id}`)
  
if(!kanal) return
member.roles.add(rol)
  client.channels.cache.get(kanal).send('<:NormalEmojiM3L1H596:825007177214984282> Otomatik Rol Verildi Seninle Beraber **`'+member.guild.memberCount+'`** Kişiyiz! <:OnayPng:807560289196179486> Hoşgeldin! **`'+member.user.username+'`**')

});


// OTOROL SON


////RESIMLI GUVENLIK////

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://i.hizliresim.com/FlItsX.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});

///////////RESIMLI GUVENLIK//////////





//////////////EKLENDİM ATİLDİM ////
client.on("guildCreate", async function(guild) {

const owner = client.users.cache.get(guild.ownerID)

const kanal = "827286946454831144" //Eklendim mesajının atılacağı kanal ID'sini giriniz.

const darkcode = new Discord.MessageEmbed()

.setTitle(`Yeni bir sunucuya eklendim`)

.setColor("GREEN")

.addField(`Sunucu Adı`, guild.name)

.addField(`Sunucu Sahibi`, owner.username + "#" +owner.discriminator)

.addField(`Sunucu Üye Sayısı`, guild.memberCount)

client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))

})

//Atıldım

client.on("guildDelete", async function(guild) {

const owner = client.users.cache.get(guild.ownerID)

const kanal = "827286946454831144" //Atıldım mesajının atılacağı kanal ID'sini giriniz.

const darkcode = new Discord.MessageEmbed()

.setTitle(`Bir sunucudan atıldım`)

.setColor("RED")

.addField(`Sunucu Adı`, guild.name)

.addField(`Sunucu Sahibi`, owner.username + "#" + owner.discriminator)

.addField(`Sunucu Üye Sayısı`, guild.memberCount)

client.channels.cache.get(kanal).send({embed: darkcode}).catch(err => console.log("Kanala mesaj atamıyorum!"))

})


//////ETIKETLENINCE PREFIX////

client.on("message", msg => {
	//let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
	const westrabumbe = new Discord.MessageEmbed()
	.setColor("RANDOM")
	.setDescription(`Prefixim: ${prefix}\n Yardım için: ${prefix}yardım`)
  if (msg.content.includes(`<@${client.user.id}>`) || msg.content.includes(`<@!${client.user.id}>`)) {
    msg.channel.send(westrabumbe);
  }
});

////////ETIKETLNINCE PREFIX///////  
// az daha araştır 70 de salarız
//// Seviye ///
client.on("message", async msg => {

  if(msg.content.startsWith(prefix)) return;

  const db = require('quick.db');

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`)

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`)

  let kanal = msg.guild.channels.cache.get(skanal)

  if (msg.author.bot === true) return;

  let seviyeEmbed = new Discord.MessageEmbed()

   seviyeEmbed.setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun!`)

   seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`)

   seviyeEmbed.setColor("RANDOM")

   if(!lvl) {

    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1)

    }

  

  let veri1 = [];

  

  if(seviyexp) veri1 = seviyexp

  if(!seviyexp) veri1 = 5

  

  if (msg.content.length > 7) {

    db.add(`xp_${id}_${gid}`, veri1)

  };

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`)

    let veri2 = [];

  

  if(seviyesınır) veri2 = seviyesınır

  if(!seviyesınır) veri2 = 250

   

  if (await db.fetch(`xp_${id}_${gid}`) > veri2) {

    if(skanal) {

 kanal.send(new Discord.MessageEmbed()

   .setDescription(`Tebrik ederim <@${msg.author.id}>! Seviye atladın ve **${lvl+1}** seviye oldun:tada:`)

   .setFooter(`${client.user.username} | Seviye Sistemi`)

   .setColor("RANDOM"))

    }

    db.add(`lvl_${id}_${gid}`, 1)

    db.delete(`xp_${id}_${gid}`)};

    db.set(`top_${id}`, Math.floor(lvl+1))

  });

//SEVİYE-ROL-----------------------------------

client.on('message', async message => {

  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  

    if(rrol) {

  rrol.forEach(async rols => {

    var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`)

    if(Math.floor(rrol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(rrol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

  

    if(message.content == '!rütbeler') {

    if(!rrol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      

      

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = rrol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`rrol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

  

})

client.on('message', async message => {

   var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`)

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if(srol) {

  srol.forEach(async rols => {

    var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`)

    if(Math.floor(srol2) <= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.add(rols)

    }

     else if(Math.floor(srol2) >= Math.floor(level)) {

      let author = message.guild.member(message.author)

      author.roles.remove(rols)

    }

  })

  }

    if(message.content == '!seviyerolleri' || message.content == "!levelroles") {

    if(!srol) {

                message.channel.send(new Discord.MessageEmbed()

                      .setColor("RANDOM")

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`Herhangi bir rol oluşturulmadı.`))

      return;

    }

        const { MessageEmbed } = require('discord.js')

      let d = srol.map(x => '<@&'+message.guild.roles.cache.get(x).id+'>' + ' **' + db.get(`srol3.${message.guild.id}.${x}`)+' Seviye**' ).join("\n")

    message.channel.send(new MessageEmbed()

                      .setColor("RANDOM")

                      //.setColor(message.guild.member(message.author).highestRole.hexColor)

                      .setFooter(`${client.user.username} Seviye-Rol Sistemi!`, client.user.avatarURL)

                      .setDescription(`${d}`))

  }

  

})
///////mod-log

client.on("messageDelete", async (message) => {

  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(await db.fetch(`log_${message.guild.id}`));

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "")

  log.send(embed)

})

client.on("messageUpdate", async (oldMessage, newMessage) => {

  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

  .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())
  


  .addField("**Eylem**", "Mesaj Düzenleme")

  .addField("**Mesajın sahibi**", `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`)

  .addField("**Eski Mesajı**", `${oldMessage.content}`)

  .addField("**Yeni Mesajı**", `${newMessage.content}`)

  .setTimestamp()

  .setColor("RANDOM")

  .setFooter(`Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`, oldMessage.guild.iconURL())

  .setThumbnail(oldMessage.guild.iconURL)

  client.channels.cache.get(modlog).send(embed)

});

client.on("channelCreate", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

    let kanal;

    if (channel.type === "text") kanal = `<#${channel.id}>`

    if (channel.type === "voice") kanal = `\`${channel.name}\``

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal**", `${kanal}`)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconUR)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("channelDelete", async(channel) => {

  let modlog = await db.fetch(`log_${channel.guild.id}`);

    if (!modlog) return;

    const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

    let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("RANDOM")

    .setFooter(`Sunucu: ${channel.guild.name} - ${channel.guild.id}`, channel.guild.iconURL())

    .setThumbnail(channel.guild.iconURL)

    client.channels.cache.get(modlog).send(embed)

    })

client.on("roleCreate", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Oluşturma")

.addField("**Rolü oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("roleDelete", async(role) => {

let modlog = await db.fetch(`log_${role.guild.id}`);

if (!modlog) return;

const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Rol Silme")

.addField("**Rolü silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen rol**", `\`${role.name}\` **=** \`${role.id}\``)

.setTimestamp()

.setFooter(`Sunucu: ${role.guild.name} - ${role.guild.id}`, role.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(role.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiCreate", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Oluşturma")

.addField("**Emojiyi oluşturan kişi**", `<@${entry.executor.id}>`)

.addField("**Oluşturulan emoji**", `${emoji} - İsmi: \`${emoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiDelete", async(emoji) => {

let modlog = await db.fetch(`log_${emoji.guild.id}`);

if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Silme")

.addField("**Emojiyi silen kişi**", `<@${entry.executor.id}>`)

.addField("**Silinen emoji**", `${emoji}`)

.setTimestamp()

.setFooter(`Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`, emoji.guild.iconURL)

.setColor("RANDOM")

.setThumbnail(emoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("emojiUpdate", async(oldEmoji, newEmoji) => {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Emoji Güncelleme")

.addField("**Emojiyi güncelleyen kişi**", `<@${entry.executor.id}>`)

.addField("**Güncellenmeden önceki emoji**", `${oldEmoji} - İsmi: \`${oldEmoji.name}\``)

.addField("**Güncellendikten sonraki emoji**", `${newEmoji} - İsmi: \`${newEmoji.name}\``)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`, oldEmoji.guild.iconURL)

.setThumbnail(oldEmoji.guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_ADD"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasaklama")

.addField("**Kullanıcıyı yasaklayan yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasaklanan kullanıcı**", `**${user.tag}** - ${user.id}`)

.addField("**Yasaklanma sebebi**", `${entry.reason}`)

.setTimestamp()

.setColor("RANDOM")

.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)

client.channels.cache.get(modlog).send(embed)

})

client.on("guildBanRemove", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);

if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()

.setAuthor(entry.executor.username, entry.executor.avatarURL())

.addField("**Eylem**", "Yasak kaldırma")

.addField("**Yasağı kaldıran yetkili**", `<@${entry.executor.id}>`)

.addField("**Yasağı kaldırılan kullanıcı**", `**${user.tag}** - ${user.id}`)

.setTimestamp()
//DarkCode
.setColor("RANDOM")
//DarkCode
.setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

.setThumbnail(guild.iconURL)
//DarkCode
//DarkCode
client.channels.cache.get(modlog).send(embed)

})
// mod log son ///

// İnvite Sistemi Beta //
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", async member => {
if(member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = await db.fetch(`davetlog_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
    const daveteden = member.guild.members.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

client.channels.cache.get(kanal).send(` <:OnayPng:807560289196179486> ${member} Adlı Kullanıcı Aramıza Katıldı. Kullanıcıyı Davet Eden  ${daveteden}  Toplam **${davetsayi}** Daveti Oldu`)  

      }
    
  );
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetlog_${member.guild.id}`);
  if (!kanal) return;
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
      let mesaj = db.fetch(`davetbbmesaj_${member.guild.id}`)
  db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.cache.get(kanal).send(`<:ReddetmekPng:807560290035564605> ${member} Adlı Kullanıcı Aramızdan Ayarıldı Davet Eden Bulunamadı!`);
  } else {
     
client.channels.cache.get(kanal).send(`<:ReddetmekPng:807560290035564605> ${member} Adlı Kullanıcı Aramızadan Ayrıldı Kullanıcıyı Davet Eden ${daveteden}  Toplam  **${davetsayi}** Daveti Kaldı`)  
  
      }
    }
);
// İnvite Sistemi Son //
// AYARLANABİLİR KAYIT KANAL //
// AYARLANABİLİR KAYIT KANAL //
client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** <:ReddetmekPng:807560290035564605>";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <:OnayPng:807560289196179486>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"];

  ///////////////////
  const embed = new Discord.MessageEmbed()
    .setColor("36393F")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

    .setDescription(
      `<a:ok1:824970054923452497> **Hoşgeldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n <a:yldz:824970047197282364> Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek. \n <a:ok1:824970054923452497> Hesap Kuruluş: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n <:NormalEmojiM3L1H14:825007184575987742> Bu vatandaş: ${kontrol} \n <:NormalEmojiM3L1H1107:825007175507247175> <@&${kayıtçı}> Rolundeki Yetkililer Sizinle İlgilecektir

  `
    );

  
  client.channels.cache.get(kanal).send(embed);
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
});
//kayıt kanal son //

//kayıt kanal son //

//sa-as

   const saasembed = new Discord.MessageEmbed()
////.setTitle('Bir Gold Üye Belirdi! <a:wavygolduye:742353872013754428>')
.setDescription('<:NormalEmojiM3L1H596:825007177214984282> Aleyküm Selam. Hoş Geldin! <:NormalEmojiM3L1H596:825007177214984282> ')
.setTimestamp()
.setFooter('OneWoo')
.setColor(0x36393E)
   
 client.on("message", async msg => {
  let saas = await db.fetch(`saas_${msg.guild.id}`);
  if (saas == 'kapali') return;
  if (saas == 'acik') {
  if (msg.content.toLowerCase() === 'sa' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'sae' || msg.content.toLowerCase() == 'selamün aleyküm' || msg.content.toLowerCase() == 'saa' || msg.content.toLowerCase() == 'seaa') {
    msg.channel.send(saasembed).then(msg => msg.delete({ timeout: 8000, reason: '.' }));
  }
  }
});

/// ekonomi sistemi

client.emojiler = {
  gold: "744898834584436736", //?PARAM DAKİ ALTIN EMOJİSİ
  paraGitti: "807560290035564605", // X İŞARETİ
  paraGitmedi: "807560289196179486", // TİK İŞARETİ
  paraROZET: "807560295580958730", // PARA İLE ALINAN YILDIRIM ROZET EMOJİSİ
  onayRozet: "807560214668378112", // ONAY ROZETİ
  modRozet: "807560286873714718", // MOD ROZETİ
  yetkiliRozet: "807560297148579880", // YETKİLİ ROZETİ
  destekçiRozet: "763320039893237790",
  evet: "807560216064819200", // TİK İŞARET
  hayır: "807560289196179486", // X İŞARETİ
  acikk: "807560289196179486",
  kapalii: "807560289196179486",
  kendineParaYollama: "807560290035564605", // KENDİNE PARA ATMAYA ÇALIŞANLAR İÇİN SİNİRLİ EMOJİSİ
  konfeti: "763322965060091914", // MESLEK SAHİBİ OLUNCA RENGARENK KONFETİ ATIYOR
  yukleniyor: "807560492709183529", // YÜKLENİYOR EMOJİ İŞTE :D
  sinirli: "807560290035564605", // TİTREYEN SİNİRLİ :D
  mutlu: "807560289196179486", // MUTLU EMOJİ
  rahatsızetme: "807560297631711262"  , // RAHATSIZ ETMEYİN EMOJİSİ
  çevrimiçi: "807560289196179486", // ÇEVRİMİÇİ EMOJİSİ
  yayıncı: "807560294448365650", // YAYINCI EMOJİSİ
  çevrimdışı: "807560294787842059", // ÇEVRİM DIŞI EMOJİSİ
  boşta: "807560294787842059", // BOŞTA EMOJİSİ
  bot: "807560491713953821", // BOT EMOJİSİ
  polis: "807560297631711262", // POLİS EMOJİ
  Yvar: "807560289196179486", // YETKİLERİM KOMUDUNDAKİ TİK İŞARETİ
  Yyok: "807560290035564605", // YETKİLERİM KOMUDUNDAKİ X İŞARETİ
  yan: "807560297857810472", // > GİBİ EMOJİ İŞTE :ç
  kalpSarılmalı: "807560297857810472",
  olumlu: "",
  olumsuz: "",

  // AYARLAR KOMUDUNDAKİ AÇIK KAPALI EMOJİLERİ >>>>>>>>>>>>>>>>>
  kapalıA: "807560290035564605",
  açıkA: "807560289196179486",

  // AÇIK BONUS EMOJİLERİ -------------- >>>>>>>>>>

  açıkB: "807560286873714718", // B
  açıkO: "807560286873714718", // O
  açıkN: "807560286873714718", // N
  açıkU: "807560286873714718", // U
  açıkS: "807560286873714718", // S

  // KAPALI BONUS EMOJİLERİ ---------------- >>>>>>>>>>>>>

  kapalıO: "807560297631711262", // O
  kapalıN: "807560297631711262", // N
  kapalıU: "807560297631711262", // U
  kapalıS: "807560297631711262" // S
};

client.ayarlar = {
  official_sahip: "627543270985170958",
  sahip: "627543270985170958",

  yardimcilar: [""],
  isim: "OneWoo",
  botD:
    "https://discordapp.com/oauth2/authorize?client_id=726348750653489163&scope=bot&permissions=8",
  webS: "",
  web: "",
  site: "",
  dblO: "",
  dbl: "",
  dbltoken:
        "",
  webpanel: "",
  versiyon: "2.0",
  prefix: "!",
  renk: "RANDOM",
  version: "1.0.0"
};


//sahibim geldi
client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let timeout = 500000//süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
let i = ayarlar.sahip
          if (msg.author.id == i) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 1) {
db.set(`goldzzz_${msg.author.id}`, Date.now());
  var embed = new Discord.MessageEmbed()
  .setDescription(`<:NormalEmojiM3L1H1270:825007186593579038> İşte benim **Sahibim Burada Aç Yolu**! <@${msg.author.id}>`)
.setThumbnail('https://cdn.discordapp.com/attachments/824331327372656650/825027634655133726/Code-Optimization.png')
  .setColor("RANDOM")
   msg.channel.send(embed)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});



client.on("ready", async function() {
const voiceChannel = "824740319110496256"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})

client.on("guildCreate", guild => {
guild.owner.send(`
**Merhaba, __${guild.owner.user.username}!__**
**Beni __Kurucusu__ olduğun __${guild.name}__ sunucusuna eklediğin için teşekkürler**

Botumuzdaki özelliklere daha hızlı ulaşabilmek için (https://discord.gg/QHXRtnsVtZ) sunucumuza gelebilirsin.
`)
})
//müzik sistemi

//MÜZİK SİSTEMİ SON

const emmmmbed = new Discord.MessageEmbed()
  .setThumbnail()
  .setImage(
    "https://cdn.discordapp.com/attachments/725317564074557490/811627276822511646/standard_2.gif"
  )
  .addField(
    `OneWoo | Teşekkürler`,
    `**Selamlar, Ben OneWoo (OneWoo Bot'un Geliştiricisi) Öncelikle Botumuzu Eklediğiniz ve Bize Destek Olduğunuz İçin Sizlere Teşekkürlerimi Sunarım**`
  )
  .addField(
    `OneWoo | Prefix`,
    `**OneWoo Botun Prefixi(ön eki) = \`!\`\n\n Değiştirebilmek için \`!prefix\` Yazabilirsiniz.**`
  )
  .addField(
    `OneWoo | Nasıl Kullanılır?`,
    `**OneWoo botun tüm özelliklerinden yararlanabilmek için sadece \`!yardım\` yazmanız yeterlidir.**`
  )
  .addField(
    `OneWoo | Linkler`,
    `**Sohbet Kanalına !davet Yazmanız Yeterlidir**`
  )
  .setFooter(`OneWoo | Gelişmiş Türkçe Bot | 2021`)
  .setTimestamp();

client.on("guildCreate", guild => {
  let defaultChannel = "";
  guild.channels.cache.forEach(channel => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  });

  defaultChannel.send(emmmmbed);
});

//ddos Koruma 

client.on('message', msg => {

if(client.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong',
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "ddos-system")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__  __**Sunucu Pingimiz**__ :`+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti"))
           .catch(console.error);
}});

//rol koruma
//ROL KORuma
client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) { 
         const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Roller Tekrar Açıldı.'})
  }
})

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) { 
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
  role.delete()
}
})


//Müzik Sistem

//MÜZİK SİSTEMİ



const youTube = require('simple-youtube-api');
const Ytdl = require('ytdl-core');
const youtube = new YouTube('AIzaSyCGv3XTjkxn4tlnoEgVRMDKATU2AknJV9M'); //api key buraya yazılacak

client.on("message", async message => {
  
  if (!message.guild) return;
 
  
  var prefix = ayarlar.prefix;
  
  var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(' ');
  var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
  var serverQueue = queue.get(message.guild.id);
  
    switch (args[0].toLowerCase()) {
        
      case "oynat":
    var voiceChannel = message.member.voice.channel;
        
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Dinlemek istediğin şarkıyı yazmalısın! (Şarkı ismi veya Youtube URLsi)")
    if (!url) return message.channel.send(embed);
        
    const voiceChannelAdd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`)
    if (!voiceChannel) return message.channel.send(voiceChannelAdd);
    var permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
      const warningErr = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`)
      return message.channel.send(warningErr);
    }
    if (!permissions.has('SPEAK')) {
      const musicErr = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`)
      return message.channel.send(musicErr);
    }
      if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      var playlist = await youtube.getPlaylist(url);
      var videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        var video2 = await youtube.getVideoByID(video.id);
        await handleVideo(video2, message, voiceChannel, true);
      }
      const PlayingListAdd = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`[${playlist.title}](https://www.youtube.com/watch?v=${playlist.id}) İsimli şarkı oynatma listesine Eklendi.`)
      return message.channel.send(PlayingListAdd);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
      try {
          var videos = await youtube.searchVideos(searchString, 10);
          
          var r = 1
        
          var video = await youtube.getVideoByID(videos[r - 1].id);
        } catch (err) {
          console.error(err);
          const songNope = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(`Aradığınız isimde bir şarkı bulamadım.`) 
          return message.channel.send(songNope);
        }
      }
      return handleVideo(video, message, voiceChannel);
    }
    break
	       case "tekrar":
       const e = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voice.channel) return message.channel.send(e);
    const p = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(p);
        
    var u = serverQueue.songs[0]
        
    /*var pla = await youtube.getPlaylist(u);
      var v = await pla.getVideos();*/
      var vi2 = await youtube.getVideoByID(u.id);
      await handleVideo(vi2, message, voiceChannel, true);
    const PlayingListAdd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`[${u.title}](https://www.youtube.com/watch?v=${u.id}) İsimli şarkı bitince tekrar oynatılacak.`)
    return message.channel.send(PlayingListAdd);
        
    break;
      case "geç":
      const err0 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`) 
    if (!message.member.voice.channel) return message.channel.send(err0);
    const err05 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(err05);
    const songSkip = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla geçildi!`)
    serverQueue.connection.dispatcher.end('');
    message.channel.send(songSkip)
    return undefined;
break;
      case "kapat":
    const err1 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voice.channel) return message.channel.send(err1);
    const err2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(err2);
    serverQueue.songs = [];
    const songEnd = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla durduruldu ve odadan ayrıldım!`)
    serverQueue.connection.dispatcher.end('');
    message.channel.send(songEnd);
    return undefined;
break;
      case "ses":
      const asd1 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voice.channel) return message.channel.send(asd1);
    const asd2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(asd2);

    if (!args[1]) return message.reply("Ses seviyesi ayarlamak için bir sayı yaz!");
    serverQueue.volume = args[1];
    if (args[1] > 10) return message.channel.send(`Ses seviyesi en fazla \`10\` olarak ayarlanabilir.`)
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    const volumeLevelEdit = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`)
    return message.channel.send(volumeLevelEdit);
break;
      case "kuyruk":
      var siralama = 0;
        const a = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Bir sesli kanalda değilsin.`)  
    if (!message.member.voice.channel) return message.channel.send(a);
    const b = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`)
    if (!serverQueue) return message.channel.send(b);
        
    var k = serverQueue.songs.map(song => `${++siralama} - [${song.title}](https://www.youtube.com/watch?v=${song.id})`).join('\n').replace(serverQueue.songs[0].title, `**${serverQueue.songs[0].title}**`)
        
    const kuyruk = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .addField("Şarkı Kuyruğu", k)
    return message.channel.send(kuyruk)
break;
case "durdur":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla duraklatıldı!`)
      return message.channel.send(asjdhsaasjdha);
    }
    return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
break;
      case "devam":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Şarkı başarıyla devam ettiriliyor...`)
      return message.channel.send(asjdhsaasjdhaadssad);
    }
    return message.channel.send('Şuanda herhangi bir şarkı çalmıyor.');
    

  return undefined;
break;
}
async function handleVideo(video, message, voiceChannel, playlist = false) {
  var serverQueue = queue.get(message.guild.id);
  //console.log(video);
  var song = {
    id: video.id,
    title: video.title,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
		durations: video.duration.seconds,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    requester: message.author.id,
  };
  if (!serverQueue) {
    var queueConstruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Ses kanalına giremedim HATA: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`Ses kanalına giremedim HATA: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    //console.log(serverQueue.songs);
    if (playlist) return undefined;

    const songListBed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`)
    return message.channel.send(songListBed);
  }
  return undefined;
}
  function play(guild, song) {
  var serverQueue = queue.get(guild.id);

  if (!song) {
    queue.delete(guild.id);
    return;
  }
  //console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection.play(ytdl(song.url))
    .on('end', reason => {
      if (reason === 'İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.');
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  
  const playingBed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("**OneWoo Müzik Sistemi**", `https://i.postimg.cc/BnQCzh2s/861acd45b3d34f97265ac7161fbb6763.png`)
  .setAuthor(`Şuanda Oynatılıyor`, "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png")
  .setDescription(`[${song.title}](${song.url})`)
  .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
  .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
  .setThumbnail(song.thumbnail)
  serverQueue.textChannel.send(playingBed);
}  
})

//-------------------- Afk Sistemi --------------------//


//çekiliş sistemi
const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }//#FF0000
});
//----------------------------------------------------------------------//

//Anti Spam

const dctrat = require('dctr-antispam.js'); 
 
client.on('ready', () => {
   dctrat(client, {
        uyarılimiti: 4, // Uyarı limiti.
        susturmalimiti: 6, // Susturma limiti.
        aralık: 1500, // Mesaj yazma aralığı. ms olarak ayarlayınız
        uyarımesajı: "Spam yapmayı keser misin? Yoksa susturulacaksın!!", // Uyarı mesajı
        susturmamesajı: "Çok faaazla mesaj!! Susturuldun.", // Susturulma mesajı
        maksspam_uyarı: 3,// Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 8'den fazla ileti gönderdiğinde kullanıcılar uyarı alır.
        maksspam_susturma: 4, // Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 10'den fazla ileti gönderdiğinde kullanıcılar susturulur.
        adminrol: ["👑・Owner"], // Bu rollere sahip kullanıcılar engellenmez
        adminkullanıcı: ["! GameMoonTR™#0831"], // Bu kullanıcılar engellenmez
        susturmarolü: "Susturuldu", // Kullanıcı spam yaparsa otomatik olarak susturulur eğer rol açılmaza otomatik olarak açılır.
        susturmasüresi: 900000, // Susturma süresi bir kullanıcı spam yaptığı için susturulursa verilecek ceza süresi (15dk) ms olarak ayarlayınız.
        logkanalı: "antispam-log" // Susturulmaların ve kaldırılmalarının atılacağı log kanalı (açılmazsa otomatik bu isimde açılır.)
      });
  });
 
client.on('message', msg => {
  client.emit('checkMessage', msg); 
})


//Mute Log

client.on('guildMemberAdd', async(member) => {
 let mute = member.guild.roles.find(r => r.name === "OneWoo");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "🚧・Muted") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})





//-----------Komutlar--------------||

//-----------Komutlar--------------||
 client.on("message", async message => {
    if(message.author.bot) return;
    var spl = message.content.split(" ");
    if(spl[0] === "!emoji-rol-ayarla") {
    var args = spl.slice(1);
    var msg, emoji, rol, ee = "";
    try {
      msg = await message.channel.messages.fetch(args[0])
      emoji = args[1]
      rol = message.guild.roles.cache.get(args[2]) || message.mentions.roles.first();
      await msg.react(emoji)
      if(!rol) throw new Error("Düzgün bir rol yaz")
    } catch(e) {
      if(!e) return;
      e = (""+e).split("Error:")[1]
      if(e.includes("Cannot read property") || e.includes("Invalid Form Body")) {
        message.channel.send(`Mesaj id hatalı!`)
      } else if(e.includes("Emoji")) {
        message.channel.send(` Girdiğiniz emoji mesaja eklenemiyor!`)
      } else if(e.includes("ROLÜ")) {
        message.channel.send(`Girdiğiniz rol geçersiz!`)
      }
      ee = e
    }
     if(ee) return;
     message.channel.send(`:white_check_mark: | Emoji rol, **${msg.content}** içerikli mesaja atandı!`)
     db.push(`tepkirol.${message.guild.id}`, {
       kanal: msg.channel.id,
       rol: rol.id,
       mesaj: msg.id,
       emoji: emoji
     })
    } else if(spl[0] === "!emoji-rol-log") {
      var args = spl.slice(1)
      var chan = message.guild.channels.cache.get(args[0]) || message.mentions.channels.first()
      if(!chan) return message.channel.send(`:warning: | Kanal etiketle veya id gir`)
      db.set(`tepkirolkanal.${message.guild.id}`, chan.id)
      message.channel.send(":white_check_mark: | Tepkirol log kanalı "+ chan+ " olarak ayarlandı!")
    }
  })

  client.on("raw", async event => {
    if(event.t === "MESSAGE_REACTION_ADD") {
      var get = db.get(`tepkirol.${event.d.guild_id}`)
      if(!get) return;
      var rol = get.find(a => a.emoji === event.d.emoji.name && a.mesaj === event.d.message_id)
      if(!rol) return;
      rol = rol.rol
      var member = await client.guilds.cache.get(event.d.guild_id).members.fetch(event.d.user_id)
      member.roles.add(rol);
      var kanal = db.get(`tepkirolkanal.${event.d.guild_id}`)
      if(kanal) {
        var kanal = client.channels.cache.get(kanal)
        kanal.send(member  + " kullanıcısına, **" + kanal.guild.roles.cache.get(rol).name + "** adlı rol verildi! ")
      }
    } else if(event.t === "MESSAGE_REACTION_REMOVE") {
      var get = db.get(`tepkirol.${event.d.guild_id}`)
      if(!get) return;
      var rol = get.find(a => a.emoji === event.d.emoji.name && a.mesaj === event.d.message_id)
      if(!rol) return;
      rol = rol.rol
      var member = await client.guilds.cache.get(event.d.guild_id).members.fetch(event.d.user_id)
      member.roles.remove(rol);
      var kanal = db.get(`tepkirolkanal.${event.d.guild_id}`)
      if(kanal) {
        var kanal = client.channels.cache.get(kanal)
        kanal.send(member + " kullanıcısından, **" + kanal.guild.roles.cache.get(rol).name + "** adlı rol alındı!")
      }
    }
  })
  
  client.on("message" , async message => {
  
const msg = message;
  
if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
  
/*db.set(`afkSebep_${message.author.id}_${message.guild.id}`, "Sebep Girilmemiş")
db.set(`afkKisi_${message.author.id}_${message.guild.id}`, message.author.id)           
db.set(`afkAd_${message.author.id}_${message.guild.id}`, message.author.username)*/
  
let afk = message.mentions.users.first()
  
const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)

 if(afk){
   
const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)

if(message.content.includes(kisi3)){
  
const embed = new Discord.MessageEmbed()

.setAuthor("Afk Sistemi" , client.user.avatarURL)
.setColor("BLACK")

.setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)

.setFooter(`${message.author.username} Tarafından İstendi`)
.setTimestamp()

message.channel.send(embed)
}
   
}
  
if(message.author.id === kisi){
  
const embed = new Discord.MessageEmbed()

.setAuthor("Afk Sistemi" , client.user.avatarURL)
.setColor("BLACK")

.setDescription(`Afk'lıktan Çıktınız.`)

.setFooter(`${message.author.username} Tarafından İstendi`)
.setTimestamp()

message.channel.send(embed)
  
db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
db.delete(`afkid_${message.author.id}_${message.guild.id}`)
db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
  
message.member.setNickname(isim)
}
  
})



client.on('message', msg => {
  if (msg.content === prefix + 'iftar') {
  	if (msg.author.bot) return;
   	msg.reply(' !!iftar [Şehir İsmi] | Şehirin baş harfi büyük olacak şekilde yazınız!');
  }
  if (msg.content === prefix + 'iftar'+' Adana') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4892/ADANA/TURKIYE');
  } 
    if (msg.content === prefix + 'iftar'+' Adıyaman') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4893/ADIYAMAN/TURKIYE');
  }
    if (msg.content === prefix + 'iftar'+' Afyon') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4894/AFYON/TURKIYE');
  }
    if (msg.content === prefix + 'iftar'+' Ağrı') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4895/AGRI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Amasya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4911/AMASYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Ankara') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4913/ANKARA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Antalya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4914/ANTALYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Artvin') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4921/ARTVIN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Aydın') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4924/AYDIN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Balıkesir') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4928/BALIKESIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bilecik') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4938/BILECIK/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bingöl') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4939/BINGOL/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bitlis') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4941/BITLIS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bolu') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4942/BOLU/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Burdur') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4946/BURDUR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bursa') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4947/BURSA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Çanakkale') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4953/CANAKKALE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Çankırı') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4954/CANKIRI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Çorum') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4968/CORUM/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Denizli') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4976/DENIZLI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Diyarbakır') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4984/DIYARBAKIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Edirne') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4987/EDIRNE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Elazığ') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4989/ELAZIG/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Erzincan') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4995/ERZINCAN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Erzurum') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4996/ERZURUM/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Eskişehir') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4998/ESKISEHIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Gaziantep') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5005/GAZIANTEP/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Giresun') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5010/GIRESUN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Gümüşhane') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5015/GUMUSHANE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Hakkari') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5020/HAKKARI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Hatay') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5023/HATAY/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Isparta') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5039/ISPARTA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Mersin') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5100/MERSIN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' İstanbul') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5041/ISTANBUL/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' İzmir') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5043/IZMIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kars') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5062/KARS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Malatya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5094/MALATYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Manisa') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5097/MANISA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Maraş') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5046/KAHRAMANMARAS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Mardin') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5098/MARDIN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Muğla') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5104/MUGLA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Muş') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5105/MUS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Nevşehir') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5110/NEVSEHIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Niğde') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5111/NIGDE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Ordu') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5117/ORDU/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Rize') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5128/RIZE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Sakarya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5130/SAKARYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Samsun') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5131/SAMSUN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Siirt') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5142/SIIRT/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Sinop') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5147/SINOP/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Sivas') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5149/SIVAS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Tekirdağ') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5156/TEKIRDAG/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Tokat') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5160/TOKAT/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bayburt') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4931/BAYBURT/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Karaman') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5056/KARAMAN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kırıkkale') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5076/KIRIKKALE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Batman') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4930/BATMAN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Şırnak') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5148/SIRNAK/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Bartın') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4929/BARTIN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Ardahan') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4916/ARDAHAN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Iğdır') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5033/IGDIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Yalova') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5174/YALOVA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Karabük') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5050/KARABUK/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kilis') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5073/KILIS/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Osmaniye') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5119/OSMANIYE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Düzce') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4985/DUZCE/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kastamonu') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5065/KASTAMONU/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kayseri') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5068/KAYSERI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kırklareli') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5077/KIRKLARELI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kırşehir') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5078/KIRSEHIR/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kocaeli') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5082/KOCAELI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Konya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5084/KONYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Kütahya') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5092/KUTAHYA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Trabzon') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5164/TRABZON/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Tunceli') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5166/TUNCELI/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Şanlıurfa') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5133/SANLIURFA/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Uşak') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5169/USAK/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Van') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5172/VAN/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Yozgat') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5178/YOZGAT/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Zonguldak') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/5181/ZONGULDAK/TURKIYE');
  }
     if (msg.content === prefix + 'iftar'+' Aksaray') {
   	msg.reply('https://iftaranekadarkaldi.com/sehir/4900/AKSARAY/TURKIYE');
  }
  if (msg.content === 'acıktım') {
   	if (Math.floor((Math.random() * 15) + 1) === 1) {
   		msg.reply('Az sabret iftara az kaldı!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 2) {
   		msg.reply('Sabreden deviş muradına ermiş!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 3) {
   		msg.reply('Sabret kardeşim!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 4) {
   		msg.reply('Film izle. Açlığını unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 5) {
   		msg.reply('Dizi izle. Açlığını unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 6) {
   		msg.reply('Oyun oyna. Açlığını unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 7) {
   		msg.reply('Ders çalış açlığını unutursun! Açlığını unutursun. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 8) {
   		msg.reply('Git bi gez gel. Açlığını unutursun. Güneşden gitmemeye çalış!Dur dur şaka coronayı unuttuk :) Açlık başımıza vurdu iyice ');
   	}else if (Math.floor((Math.random() * 15) + 1) === 9) {
   		msg.reply('Geçecek bunlar, sen neler atlattın bu ne ki? :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 10) {
   		msg.reply('Büyüyünce geçer. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 11) {
   		msg.reply('Ağla. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 12) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki çatalı yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 13) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki kaşığı yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 14) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki bıçağı yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 15) {
   		msg.reply('Başka bir şey düşünmeye çalış!');
   	}
  }

  if (msg.content === 'susadım') {
   	if (Math.floor((Math.random() * 15) + 1) === 1) {
   		msg.reply('Az sabret iftara az kaldı!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 2) {
   		msg.reply('Sabreden deviş muradına ermiş!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 3) {
   		msg.reply('Sabret kardeşim!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 4) {
   		msg.reply('Film izle. Susuzluğunu unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 5) {
   		msg.reply('Dizi izle. Susuzluğunu unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 6) {
   		msg.reply('Oyun oyna. Susuzluğunu unutursun. :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 7) {
   		msg.reply('Ders çalış açlığını unutursun! Susuzluğunu unutursun. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 8) {
   		msg.reply('Git bi gez gel. Susuzluğunu unutursun.');
   	}else if (Math.floor((Math.random() * 15) + 1) === 9) {
   		msg.reply('Geçecek bunlar, sen neler atlattın bu ne ki? :)');
   	}else if (Math.floor((Math.random() * 15) + 1) === 10) {
   		msg.reply('Büyüyünce geçer. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 11) {
   		msg.reply('Ağla. :D');
   	}else if (Math.floor((Math.random() * 15) + 1) === 12) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki şişeyi yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 13) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki içeceği yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 14) {
   		msg.reply('Lanet olsun dostum, hemen o elindeki bardağı yere bırak!');
   	}else if (Math.floor((Math.random() * 15) + 1) === 15) {
   		msg.reply('Başka bir şey düşünmeye çalış!');
   	}
  }
  if (msg.content === 'of') {
   	msg.reply('Oflama geçer bugünler!');
  }
  if (msg.content === 'ah') {
   	msg.reply('Ah deme oh de!');
  }
  if (msg.content === 'oh') {
   	msg.reply('Oh deme püf de!');
  }
  if (msg.content === 'püf') {
   	msg.reply('Git, Barış MANÇO nun -Lambaya Püf De- dinle!');
  }
  if (msg.content === 'iftara ne kadar var') {
   	msg.reply('Şimdi öğren -> !iftar [Şehir ismi ilk harfi büyük yaz]');
  }
  if (msg.content === 'iftara kaç saat var') {
   	msg.reply('Şimdi öğren -> !iftar [Şehir ismi ilk harfi büyük yaz]');
  }
  if (msg.content === 'iftara kaç dakika var') {
   	msg.reply('Şimdi öğren -> !iftar [Şehir ismi ilk harfi büyük yaz]');
  }
  if (msg.content === 'iftara kaç gün var') {
   	msg.reply('Yok devenin bale pabucu!?');
  }

  if (msg.content === 'iftar ne zaman') {
  	if (Math.floor((Math.random() * 4) + 1) === 1) {
   		msg.reply('Zamanı geldiği zaman!');
   	}else if (Math.floor((Math.random() * 4) + 1) === 2) {
   		msg.reply('İmam uyumuş olmasın?');
   	}else if (Math.floor((Math.random() * 4) + 1) === 3) {
   		msg.reply('İmam bayıldı(!)');
   	}else if (Math.floor((Math.random() * 4) + 1) === 4) {
   		msg.reply('Biraz Google la! ;)');
   	}
  }

  if (msg.content === 'iftara ne kadar kaldı') {
  	if (Math.floor((Math.random() * 4) + 1) === 1) {
   		msg.reply('Çok değil! https://media.giphy.com/media/xUOwGn1kOzKcUZPBSw/giphy.gif');
   	}else if (Math.floor((Math.random() * 4) + 1) === 2) {
   		msg.reply('Görende 3 gün aç kaldı sanacak! www.com');
   	}else if (Math.floor((Math.random() * 4) + 1) === 3) {
   		msg.reply('Görende 3 gün susuz kaldı sanacak! www.com');
   	}else if (Math.floor((Math.random() * 4) + 1) === 4) {
   		msg.reply('Biraz Google la! ;)');
   	}
  }
 if (msg.content === 'iyi akşamlar') {
   	msg.reply('sana da iyi akşamlar');
  }
  if (msg.content === 'selamın aleyküm') {
   	msg.reply('ve aleyküm selam');
  }
  if (msg.content === 'güle güle') {
   	msg.reply('sana da güle güle');
  }
  if (msg.content === 'iftar') {
   	msg.reply('Şimdi öğren -> !iftar [Şehir ismi ilk harfi büyük yaz] ');
  }
  if (msg.content === 'oruçda geldi') {
   	msg.reply('Gelmesin mi ? :)');
  }
  if (msg.content === 'gelsin') {
   	msg.reply('iyi tamam geldim :)');
  }
  if (msg.content === 'selamun aleyküm') {
   	msg.reply('Ve Aleykümselam');
  }
    if (msg.content === '!iyardım') {
   	msg.reply('!bul = Yazarak İstediğiniz Şehrin İftar Saatine Bakarasınız \n susadım = Sizlere mesajlar atar \n acıktım = Sizlere mesajlar atar');
  }

});



