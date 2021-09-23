const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const HubblePhotos = require('../data/hubble.json');

module.exports = {
  data: new SlashCommandBuilder()
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
    function DateToDay(data, random) {
      if (data && !random) {
        const custDate = new Date(
          `2020/${data.split('/')[1]}/${data.split('/')[0]}`
        );
        const dayOfYear = (date) =>
          Math.floor((date - new Date(2020, 0, 1)) / 1000 / 60 / 60 / 24);
        return dayOfYear(custDate);
      }
      if (!data && !random) {
        const now = new Date();
        const dayOfYear = (date) =>
          Math.floor(
            (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
          );
        return dayOfYear(now);
      }
      if (random) {
        return Math.floor(Math.random() * (366 - 0 + 1) + 0);
      }
    }

    const day = DateToDay(
      interaction.options.getString('data'),
      interaction.options.getBoolean('random')
    );

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
      console.log(day);
      const spaaaaaace = new MessageEmbed()
        .setTitle('Foto dello spazio in arrivo!')
        .setColor('DARK_BUT_NOT_BLACK')
        .setImage(HubblePhotos[day].Link);

      if (HubblePhotos[day].Year === 'null') {
        spaaaaaace.setDescription(
          `Questa foto è stata scattata il: ${HubblePhotos[day].Day}/${HubblePhotos[day].Month}, l'anno non è stato documentato`
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
