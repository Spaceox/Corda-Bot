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
      var hours = Math.floor(seconds / (60 * 60));
      var minutes = Math.floor((seconds % (60 * 60)) / 60);
      var seconds = Math.floor(seconds % 60);

      return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
    }
    // ms => sec https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
    var millis = ((interaction.client.uptime % 60000) / 1000).toFixed(0);
    const timed = format(millis);
    console.log(timed);

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
