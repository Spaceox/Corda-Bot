/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const dotenv = require('dotenv');
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

dotenv.config();
const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// event e command handler
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

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
