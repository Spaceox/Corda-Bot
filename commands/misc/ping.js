const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('ping')
    .setDescription('Risponde con Pong!'),
  async execute(interaction) {
    const pinging = new MessageEmbed()
      .setColor('RED')
      .setTitle(`🏓 Pinging... 🏓`);

    // Invia un messaggio con l'embed qui sopra..
    const msg = await interaction.reply({
      embeds: [pinging],
      fetchReply: true,
    });

    // ..e una volta ricevuto comincia a calcolare la latenza..
    const pinged = new MessageEmbed()
      .setTitle(`🏓 Pong! 🏓`)
      .setColor('GREEN')
      .setDescription(
        `Latenza: ${Math.floor(
          msg.createdTimestamp - interaction.createdTimestamp
        )}ms.\nWebsocket heartbeat: ${interaction.client.ws.ping}ms.`
      );
    // ..per poi inviarla.
    await interaction.editReply({ embeds: [pinged] });
  },
};
