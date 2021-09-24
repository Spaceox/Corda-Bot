const { SlashCommandBuilder } = require('@discordjs/builders');
const sagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('dog')
    .setDescription('Risponde con una foto di un cane casuale.'),
  async execute(interaction) {
    // Scarica il json da random.dog/woof(.json) ed estrae l'oggetto body
    const { body } = await sagent.get('https://random.dog/woof.json');

    // Per poi buttarlo in un embed e inviarlo
    const dogembed = new MessageEmbed()
      .setTitle('Doggo :dog:')
      .setColor('RANDOM')
      .setImage(body.url);

    await interaction.reply({ embeds: [dogembed] });
  },
};
