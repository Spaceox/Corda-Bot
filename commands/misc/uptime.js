const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('uptime')
    .setDescription("Risponde con l'uptime!"),
  async execute(interaction) {
    // sec => HHMMSS https://stackoverflow.com/questions/28705009/how-do-i-get-the-server-uptime-in-node-js
    function format(seconds) {
      function pad(s) {
        return (s < 10 ? '0' : '') + s;
      }

      return (
        pad(Math.floor(seconds / (60 * 60))) +
        ':' +
        pad(Math.floor((seconds % (60 * 60)) / 60)) +
        ':' +
        pad(Math.floor(seconds % 60))
      );
    }
    const timed = format(process.uptime());

    // Carica l'uptime in un embed
    const pinged = new MessageEmbed()
      .setTitle(`:clock1230:  Uptime!`)
      .setColor('BLURPLE')
      .setDescription(
        `:white_check_mark:  **${interaction.client.user.username}** è attivo da: ${timed}`
      );
    // e lo invia
    await interaction.reply({ embeds: [pinged] });
  },
};
