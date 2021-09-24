/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Client, Collection, Intents } = require('discord.js');
const { Player } = require('discord-music-player');

dotenv.config();
const token = process.env.TOKEN;
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
client.commands = new Collection();

// Impostazioni discord-media-player
const player = new Player(client, {
  leaveOnEmpty: true,
});

// Per accesso più facile
client.player = player;

// vecchio command handler
/* const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
} */

// Command handler di Worn Off Keys
// link: https://github.com/AlexzanderFlores/Worn-Off-Keys-Discord-Js/blob/master/22-Advanced-Command-Handler/index.js
const readCommands = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readCommands(path.join(dir, file));
    } else {
      const command = require(path.join(__dirname, dir, file));
      client.commands.set(command.data.name, command);
    }
  }
};

readCommands('commands');

// L'event handler rimane come prima però
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login a Discord
client.login(token);
