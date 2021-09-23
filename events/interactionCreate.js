const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      const err = new MessageEmbed()
        .setColor('RED')
        .setTitle(`S'è rotto tutto!`)
        .setDescription(
          'Qualcosa è andato storto e ha prodotto questo errore. Il bot dovrebbe funzionare ancora però.'
        )
        .setFooter("Stai tranquillo, nessun'altro vedrà questo errore.");
      await interaction.reply({ embeds: [err], ephemeral: true });
    }
  },
};
