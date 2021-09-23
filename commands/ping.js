const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const pinging = new MessageEmbed()
      .setColor('RED')
      .setTitle(`🏓 Pinging... 🏓`);

    const msg = await interaction.reply({
      embeds: [pinging],
      fetchReply: true,
    });
    const pinged = new MessageEmbed()
      .setTitle(`🏓 Pong! 🏓`)
      .setColor('GREEN')
      .setDescription(
        `Latenza: ${Math.floor(
          msg.createdTimestamp - interaction.createdTimestamp
        )}ms.\nWebsocket heartbeat: ${interaction.client.ws.ping}ms.`
      );
    await interaction.editReply({ embeds: [pinged] });
  },
};
