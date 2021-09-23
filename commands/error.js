const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('error')
    .setDescription("Crea un messaggio d'errore"),
  async execute(interaction) {
    await interaction.editReply();
  },
};
