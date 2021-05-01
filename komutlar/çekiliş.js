const ms = require('ms');
const Discord = require("discord.js")
exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' Çekiliş başlatman için yeterli yetkin yok! gereken yetki; `Mesajları Yönet`.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(' Kanal seç!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(' Süre belirt!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners)){
        return message.channel.send(' Kaç kişi kazanıcak?');
    }
  
  if(giveawayNumberWinners > 20){
    return message.channel.send(" Çekiliş kazanan sayısı 20'den üstün olamaz!")
  }
     let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
  

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(' Ödülü ne olucak?');
    }

 client.giveawaysManager.start(giveawayChannel, {
      time: ms(giveawayDuration),
			prize: giveawayPrize,
			winnerCount: giveawayNumberWinners,
			hostedBy: message.author,
			messages: {
				giveaway:"<a:tada:821378793746464787> **Çekiliş başladı.** <a:tada:821378793746464787>",
				giveawayEnded: "<a:tada:821378793746464787> **Çekiliş bitti.** <a:tada:821378793746464787>",
				timeRemaining: "Kalan süre: **{duration}**!",
				inviteToParticipate: "Çekilişe katılmak için <a:tada:821378793746464787> emojisine tıklayın!",
				winMessage: ` Tebrikler {winners}!, **{prize}** adlı çekilişi kazandın!`,
				embedFooter: "Çekiliş",
				noWinner: " Çekiliş iptal edildi. Yeterli katılım yok.",
				hostedBy: "{user} tarafından",
				winners: "kazanan",
				endedAt: "Bittiği zaman",
				units: {
					seconds: "saniye",
					minutes: "dakika",
					hours: "saat",
					days: "gün",
					pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
				}
			}//////////////////////////////////////////
		});/////////////////////////////////////////////////////////////////////

    message.channel.send(new Discord.MessageEmbed().addField("Başarılı", ` Çekiliş ${giveawayChannel} adlı kanalda başlatıldı!`).setColor("RANDOM"));
  /////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
}

exports.help = {
	name: 'çekiliş',
	description: 'Bota istediğiniz bir şeyi yazdırırsınız.',
	usage: 'çekiliş'
}