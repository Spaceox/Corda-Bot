const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('error')
    .setDescription("Crea un messaggio d'errore"),
  async execute(interaction) {
    await interaction.editReply(); // Cerca di editare un messaggio inesistente => Errore, ottimo per testare l'embed di errore
  },
};
