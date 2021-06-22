const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "yardım",
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
    .setColor('BLURPLE')
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .addField(require('../config.js').prefix+'bot-ekle', 'Sunucuya bot ekleme isteği atarsın.', true)
    .addField(require('../config.js').prefix+'bot-reddet', 'Sunucuya gelen bot ekleme isteğini reddedersin.', true);
    let embed2 = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
    .setColor('BLURPLE')
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({dynamic:true}))
    .addField(require('../config.js').prefix+'bot-onayla', 'Sunucuya gelen bot ekleme isteğini onaylarsın.', true)
    .addField(require('../config.js').prefix+'ayarlar', 'Sunucu için geçerli ayarlamaları yaparsın.', true);
    return message.channel.createSlider(message.author.id, [ embed, embed2 ], "➡", "⬅");
  }
}