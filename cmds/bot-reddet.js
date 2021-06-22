const { MessageEmbed } = require('discord.js');
const emoji = require("../config.js");

module.exports = {
  name: "bot-reddet",
  run: async (client, message, args) => {
    let onayred = client.db.fetch(`onay-red.log.${message.guild.id}`);
    if(!onayred) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+" Onay-Red log kanalı ayarlı değil!"));
    let yetkili = client.db.fetch(`bot.yetkili.rol.${message.guild.id}`);
    if(!yetkili) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+" Bot Yetkilis rolü ayarlı değil!"));
    if(!message.member.roles.cache.has(yetkili)) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+"Sen bunu yapamazsın!"));
    let botid = args[0];
    if(!botid) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+" Lütfen bir bot ID gir!"));
    let sebep = args.slice(1).join(" ");
    if(!sebep) return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+" Lütfen bir bot red sebebi gir!"));
    let botvaryok = client.db.fetch(`bot.id.${botid}`)
    if(botid) {
      if(!botvaryok) {
        return message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+' Sistemde böyle bir bot yok!'));
      } else {
        client.channels.cache.get(onayred).send(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.evet+" <@"+botid+"> adlı bot <@"+message.author.id+"> tarafından reddedildi!\nSebep: **"+sebep+"**"));
        message.reply(new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.evet+" <@"+botid+"> adlı bot reddedildi!"));
        client.db.delete(`bot.id.${botid}`)
      }
    }
  }
}