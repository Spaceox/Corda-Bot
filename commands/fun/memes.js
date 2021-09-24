const { SlashCommandBuilder } = require('@discordjs/builders');
const randomPuppy = require('random-puppy');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('meme')
    .setDescription('Risponde con un meme epiko!'),
  async execute(interaction) {
    const subReddits = ['dankmeme', 'meme', 'me_irl'];
    // Prende un subreddit casuale dall'array qui sopra e lo scarica
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const img = await randomPuppy(random);
    // Per poi buttarlo in un embed e inviarlo
    const maymeys = new MessageEmbed()
      .setColor('RANDOM')
      .setImage(img)
      .setTitle(`From /r/${random}`)
      .setURL(`https://reddit.com/r/${random}`);

    await interaction.reply({ embeds: [maymeys] });
  },
};
