const { SlashCommandBuilder } = require('@discordjs/builders');
const sagent = require('superagent');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Risponde con una foto di un gatto casuale.'),
  async execute(interaction) {
    const { body } = await sagent.get('http://aws.random.cat/meow');

    const cattoembed = new MessageEmbed()
      .setTitle('Cat :cat:')
      .setColor('RANDOM')
      .setImage(body.file);

    await interaction.reply({ embeds: [cattoembed] });
  },
};
