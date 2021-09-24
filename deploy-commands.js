/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.TOKEN;
const guildId = process.env.GUILDID;
const clientId = process.env.CLIENTID;

const commands = [];

// Vecchio command handler, aggiornato per supportare le subdirectory

/* const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
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
      commands.push(command.data.toJSON());
    }
  }
};

readCommands('commands');

// Non so come funziona questa roba magika ma funziona (discordjs.guide)

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Refresh dei comandi slash (/).');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log('Comandi slash (/) ricaricati con successo!');
    console.log('Ora puoi avviare il bot.');
  } catch (error) {
    console.error(error);
  }
})();
