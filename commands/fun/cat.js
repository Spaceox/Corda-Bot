const { SlashCommandBuilder } = require('@discordjs/builders');
const sagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('cat')
    .setDescription('Risponde con una foto di un gatto casuale.'),
  async execute(interaction) {
    // Scarica il json da aws.random.cat/meow ed estrae l'oggetto body
    const { body } = await sagent.get('http://aws.random.cat/meow');

    // Per poi buttarlo in un embed e inviarlo
    const cattoembed = new MessageEmbed()
      .setTitle('Cat :cat:')
      .setColor('RANDOM')
      .setImage(body.file);

    await interaction.reply({ embeds: [cattoembed] });
  },
};
