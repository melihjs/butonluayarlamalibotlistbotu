const { MessageEmbed } = require('discord.js');
const emoji = require("../config.js");

module.exports = {
  name: "ayarlar",
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(emoji.hayir+" Bunu kullanabilmek için `Yönetici` yetkisine ihtiyacın var!")
      );
    }
    let arg = args[0];
    if (!arg) {
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
          emoji.hayir+" Lütfen bir seçenek belirt!\n\n:star2: Değişkenler:\n`bot-ekle-kanal`\n`bot-log-kanal`\n`onay-red-log-kanal`\n`bot-yetkili-rol`\n`görüntüle`"
        )
      );
    } else if (arg == "bot-ekle-kanal") {
      let kanal = message.mentions.channels.first();
      if (!kanal) {
        return message.channel.send(
          new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
            emoji.hayir+" Geçerli bir kanal etiketlemen gerek: `#kanal`"
          )
        );
      }
      client.db.set(`bot.ekle.log.${message.guild.id}`, kanal.id);
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
          emoji.evet+" Bot Ekleme kanalı ayarlandı: <#" +
            kanal +
            ">"
        )
      );
    } else if (arg == "bot-log-kanal") {
      let kanal = message.mentions.channels.first();
      if (!kanal) {
        return message.channel.send(
          new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
            emoji.hayir+" Geçerli bir kanal etiketlemen gerek: `#kanal`"
          )
        );
      }
      client.db.set(`bot.log.${message.guild.id}`, kanal.id);
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
          emoji.evet+" Bot Log kanalı ayarlandı: <#" + kanal + ">"
        )
      );
    } else if (arg == "onay-red-log-kanal") {
      let kanal = message.mentions.channels.first();
      if (!kanal) {
        return message.channel.send(
          new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
            emoji.hayir+" Geçerli bir kanal etiketlemen gerek: `#kanal`"
          )
        );
      }
      client.db.set(`onay.red.log.${message.guild.id}`, kanal.id);
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
          emoji.evet+" Onay-Red kanalı ayarlandı: <#" + kanal + ">"
        )
      );
    } else if (arg == "bot-yetkili-rol") {
      let rol = message.mentions.roles.first();
      if (!rol) {
        return message.channel.send(
          new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('RED').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
            emoji.hayir+" Geçerli bir rol etiketlemen gerek: `@rol`"
          )
        );
      }
      client.db.set(`bot.yetkili.rol.${message.guild.id}`, rol.id);
      return message.channel.send(
        new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true})).setColor('GREEN').setTimestamp().setThumbnail(message.guild.iconURL({dynamic:true})).setDescription(
          emoji.evet+" Bot Yetkilisi rolü ayarlandı: <@&" +
            rol +
            ">"
        )
      );
    } else if(arg == "görüntüle") {
      let yetkili = client.db.fetch(`bot.yetkili.rol.${message.guild.id}`);
      let onayred = client.db.fetch(`onay.red.log.${message.guild.id}`);
      let botekle = client.db.fetch(`bot.ekle.log.${message.guild.id}`);
      let botlogs = client.db.fetch(`bot.log.${message.guild.id}`);
      let rl;
      let sl;
      let kl;
      let cl;
      if(!yetkili) {
        rl = `${emoji.hayir} Ayarlanmamış!`
      } else {
        rl = `${emoji.evet} <@&${yetkili}> (\`${message.guild.roles.cache.get(yetkili).name}\`)`
      };
      if(!onayred) {
        sl = `${emoji.hayir} Ayarlanmamış!`
      } else {
        sl = `${emoji.evet} <#${onayred}> (\`${message.guild.channels.cache.get(onayred).name}\`)`
      };
      if(!botekle) {
        kl = `${emoji.hayir} Ayarlanmamış!`
      } else {
        kl = `${emoji.evet} <#${botekle}> (\`${message.guild.channels.cache.get(botekle).name}\`)`
      };
      if(!botlogs) {
        cl = `${emoji.hayir} Ayarlanmamış!`
      } else {
        cl = `${emoji.evet} <#${botlogs}> (\`${message.guild.channels.cache.get(botlogs).name}\`)`
      };
      let embeds = new MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true}))
      .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
      .setColor('BLURPLE')
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({dynamic:true}))
      .addField('Bot Ekleme Kanalı', kl)
      .addField('Bot Log Kanalı', cl)
      .addField('Bot Yetkili Rolü', rl)
      .addField('Onay Red Kanalı', sl);
      return message.channel.send(embeds)
    }
  }
}