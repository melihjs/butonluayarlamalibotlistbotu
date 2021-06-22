const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.js");
const client = new discord.Client();
client.commands = new discord.Collection();
require("discord-buttons")(client);
require('discord-slider')(client);
client.db = require('croxydb');

client.on("ready", () => { console.log("[BOT]: "+client.user.tag+" aktif.") });

client.on('message', async (message) => {
  let prefix = config.prefix;
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  if(!message.guild) return;
  cmd.run(client, message, args);
});

fs.readdir('./cmds/', (err, files) => {
  if (err) client.logger.error(err);
  console.log(`[BOT]: ${files.length} adet komut yüklenecek.`)
  files.forEach(f => {
    let cmd = require(`./cmds/${f}`);
    console.log(`[BOT]: ${cmd.name} adlı komut yüklendi.`)
    client.commands.set(cmd.name, cmd);
  });
});

client.login(config.token).catch(() => {});