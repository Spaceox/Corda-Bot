const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const HubblePhotos = require('../../data/hubble.json');

module.exports = {
  data: new SlashCommandBuilder() // Info per discord
    .setName('space')
    .setDescription(
      "Risponde con una foto scattata questo giorno (dalla pagina dell'anniversario del telescopio Hubble)"
    )
    .addStringOption((option) =>
      option.setName('data').setDescription('GG/MM').setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName('random')
        .setDescription('True per foto casuale')
        .setRequired(false)
    ),
  async execute(interaction) {
    // Una non-così-semplice-da-leggere funzione che ha 3 funzioni
    function DateToDay(data, random) {
      // 1. Se il boolean random = true allora:
      if (random) {
        return Math.floor(Math.random() * (365 - 0 + 1) + 0); // Prende un numero a caso tra 0 e 365 (366 giorni) e lo lancia all'embed
      }
      // 2. Se è indicata una data allora:
      if (data) {
        const custDate = new Date(
          `2020/${data.split('/')[1]}/${data.split('/')[0]}` // Crea un nuovo DateConstructor con il giorno e il mese + l'anno 2020 (è bisesto)
        );
        const dayOfYear = (date) =>
          Math.floor((date - new Date(2020, 0, 1)) / 1000 / 60 / 60 / 24); // Viene poi passato a questa funzione di https://www.30secondsofcode.org/js/s/day-of-year
        return dayOfYear(custDate); // che senza crashare il bot lo manda all'embed
      }
      // 3. Se non è indicato niente allora:
      if (!data && !random) {
        // (potrei mettere else ma ad eslint non piace e non sapendo quale idea sia migliore, seguo eslint)
        const now = new Date(); // Come prima, crea un nuovo DateConstructor ma senza data (duh)
        const dayOfYear = (date) =>
          Math.floor(
            (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24 // Viene poi passato a questa funzione di https://www.30secondsofcode.org/js/s/day-of-year
          );
        return dayOfYear(custDate); // che senza crashare il bot lo manda all'embed
      }
    }

    // Richiamo della funzione qui sopra
    const day = DateToDay(
      interaction.options.getString('data'),
      interaction.options.getBoolean('random')
    );

    // Piccolo check per vedere se la data è invalida, e inviare un errore specifico al posto di uno generico
    if (day.toString() === 'NaN') {
      const err = new MessageEmbed()
        .setColor('RED')
        .setTitle(`Data invalida`)
        .setDescription(
          'Hai dato la data sbagliata a questo bot e perciò ti becchi questo errore.'
        )
        .setFooter("Stai tranquillo, nessun'altro vedrà questo errore.");
      await interaction.reply({ embeds: [err], ephemeral: true });
    } else {
      // L'embed menzionato prima
      const spaaaaaace = new MessageEmbed()
        .setTitle('Foto dello spazio in arrivo!')
        .setColor('DARK_BUT_NOT_BLACK')
        .setImage(HubblePhotos[day].Link);

      // Non sono riuscito a trovare tutti gli anni delle foto e quindi questo serve proprio per evitare di avere 05/02/null
      if (HubblePhotos[day].Year === 'null') {
        spaaaaaace.setDescription(
          `Questa foto è stata scattata il: ${HubblePhotos[day].Day}/${HubblePhotos[day].Month}, l'anno non è stato trovato`
        );
      } else {
        spaaaaaace.setDescription(
          `Questa foto è stata scattata il: ${HubblePhotos[day].Day}/${HubblePhotos[day].Month}/${HubblePhotos[day].Year}`
        );
      }

      await interaction.reply({ embeds: [spaaaaaace] });
    }
  },
};
