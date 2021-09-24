const { SlashCommandBuilder } = require('@discordjs/builders');
const { RepeatMode } = require('discord-music-player');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('play')
    .setDescription('Play')
    .addStringOption((option) =>
      option
        .setName('args')
        .setDescription('Link o testo da cercare')
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const args = interaction.options.getString('args').trim().split(/ +/g);
    let guildQueue = client.player.getQueue(interaction.guildId);

    let queue = client.player.createQueue(interaction.guildId);

    // Se chi invia il comando non è in un canale vocale, invia il messaggio qui sotto
    if (!interaction.member.voice.channel) {
      await interaction.reply(
        'Entra in un canale vocale e poi invia ancora il comando.'
      );
      return;
    }
    //Se chi invia il messaggio è in un canale vocale, invia il messaggio qui sotto e riproduce
    await queue.join(interaction.member.voice.channel);
    interaction.reply('In riproduzione...');
    let song = await queue.play(args.join(' ')).catch((_) => {
      if (!guildQueue) queue.stop();
    });
  },
};
