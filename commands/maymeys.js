const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Sends an epic meme'),
  async execute(interaction) {
    const subReddits = ['dankmeme', 'meme', 'me_irl'];
    // Grab a random property from the array
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    const maymeys = new MessageEmbed()
      .setColor('RANDOM')
      .setImage(img)
      .setTitle(`From /r/${random}`)
      .setURL(`https://reddit.com/r/${random}`);

    await interaction.reply({ embeds: [maymeys] });
  },
};
