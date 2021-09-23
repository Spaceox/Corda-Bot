const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crash')
    .setDescription('Crasha il bot'),
  async execute(interaction) {
    await interaction.editReply();
  },
};
