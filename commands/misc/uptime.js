const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('uptime')
    .setDescription("Risponde con l'uptime!"),
  async execute(interaction) {
    // sec => HHMMSS
    const uptime = new Date(interaction.client.uptime);
    const UPh = uptime.getUTCHours();
    const UPmin = uptime.getUTCMinutes();
    const UPsec = uptime.getSeconds();
    const timeString =
      UPh.toString().padStart(2, '0') +
      ':' +
      UPmin.toString().padStart(2, '0') +
      ':' +
      UPsec.toString().padStart(2, '0');
    // Carica l'uptime in un embed
    const pinged = new MessageEmbed()
      .setTitle(`:clock1230:  Uptime!`)
      .setColor('BLURPLE')
      .setDescription(
        `:white_check_mark:  **${interaction.client.user.username}** è attivo da: ${timeString}`
      );
    // e lo invia
    await interaction.reply({ embeds: [pinged] });
  },
};
