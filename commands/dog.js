const { SlashCommandBuilder } = require('@discordjs/builders');
const sagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dog')
    .setDescription('Risponde con una foto di un cane casuale.'),
  async execute(interaction) {
    const { body } = await sagent.get('https://random.dog/woof.json');

    const dogembed = new MessageEmbed()
      .setTitle('Doggo :dog:')
      .setColor('RANDOM')
      .setImage(body.url);

    await interaction.reply({ embeds: [dogembed] });
  },
};
