const { MessageEmbed } = require('discord.js');
const emoji = require("../config.js");

module.exports = {
  name: "bot-ekle",
  run: async (client, message, args) => {
    let botlog = client.db.fetch(`bot.log.${message.guild.id}`);
    if (!botlog) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Bot Log kanalı ayarlı değil!'));
    let basvuru = client.db.fetch(`bot.ekle.log.${message.guild.id}`);
    if (!basvuru) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Bot Ekleme kanalı ayarlı değil!'));
    if (message.channel.id !== basvuru) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Lütfen bunu <#'+basvuru+'> kanalında dene!'));
    let botid = args[0];
    let botprefix = args[1];
    if(!botid) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Lütfen bir bot ID gir!'));
    if(!botprefix) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Lütfen bir bot Prefix gir!'));
    let botvaryok = client.db.fetch(`bot.id.${botid}`)
    if(botid) {
      if(botprefix) {
        if(botvaryok) {
          message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Bu bot zaten sistemde var!'));
        } else {
          if(message.channel.id !== basvuru) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Lütfen bunu <#'+basvuru+'> kanalında dene!'));
          client.channels.cache.get(botlog).send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(`${emoji.evet} ${message.author} adlı kullanıcı <@${botid}> adlı botu eklemek için sıraya ekledi!`).addField("Bot ID", botid, true).addField("Bot Prefix", botprefix, true));
          message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.evet+' Bot ekleme isteğin alındı!')).then((s) => { s.delete({timeout:1500}), message.delete() });
          client.db.set(`bot.id.${botid}`, 'yes')
        };
      };
    };
  }
}