const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Inizializzazione prematura dell'embed (così posso inviarlo anche se il comando non è riconosciuto e non solo quando c'è un errore)
    const err = new MessageEmbed()
      .setColor('RED')
      .setTitle(`S'è rotto tutto! (o quasi)`)
      .setDescription(
        'Qualcosa è andato storto e ha prodotto questo errore. Il bot dovrebbe funzionare ancora però.'
      )
      .setFooter("Stai tranquillo, nessun'altro vedrà questo errore.");

    // Log della console
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} ha avviato un'interazione.`
    );

    const command = interaction.client.commands.get(interaction.commandName);

    // Se il comando non esiste, invia subito l'embed al posto di farlo andare in timeout.
    if (!command) {
      err.addField('Errore:', 'Questo comando non esiste.', true);
      await interaction.reply({ embeds: [err], ephemeral: true });
      console.error(`Interazione non riuscita :(\nComando Inesistente.`);
      return;
    }

    // Esegue il comando, ma se c'è qualche problema invia l'embed di errore
    try {
      await command.execute(interaction);
      console.log('Interazione riuscita!');
    } catch (error) {
      console.error(`Interazione non riuscita :(\n${error}`);
      err.addField('Errore:', ` ${error}`, true);
      await interaction.reply({ embeds: [err], ephemeral: true });
    }
  },
};
