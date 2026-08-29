import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song / شغل أغنية')
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Song name or URL / اسم الأغنية أو الرابط')
        .setRequired(true)
    ),

  async execute(interaction, database) {
    const languageService = new LanguageService(database);
    const language = await languageService.getUserLanguage(
      interaction.user.id,
      interaction.guildId
    );
    const { translate } = await import('../../config/i18n/languageService.js');

    if (!interaction.member.voice.channel) {
      const message = translate(language, 'music.notInVoiceChannel');
      return await interaction.reply({ content: message, ephemeral: true });
    }

    const song = interaction.options.getString('song');
    
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle(translate(language, 'music.nowPlaying'))
      .setDescription(`🎵 ${song}`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
