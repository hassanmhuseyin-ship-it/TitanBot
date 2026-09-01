import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService, SUPPORTED_LANGUAGES, translate } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Change your language preference / غير تفضيلاتك اللغوية')
    .addStringOption(option =>
      option
        .setName('lang')
        .setDescription('Choose a language / اختر لغة')
        .setRequired(true)
        .addChoices(
          { name: 'English 🇺🇸', value: 'en' },
          { name: 'العربية 🇸🇦', value: 'ar' }
        )
    ),

  async execute(interaction, database) {
    const selectedLanguage = interaction.options.getString('lang');
    const languageService = new LanguageService(database);

    try {
      await languageService.setUserLanguage(
        interaction.user.id,
        interaction.guildId,
        selectedLanguage
      );

      const langInfo = SUPPORTED_LANGUAGES[selectedLanguage];
      const message = translate(selectedLanguage, 'settings.languageChanged');

      const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`${langInfo.flag} ${langInfo.nativeName}`)
        .setDescription(message)
        .setFooter({ text: 'Language preference saved' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error('Error in language command:', error);
      const errorMsg = translate(selectedLanguage || 'ar', 'general.commandError');
      await interaction.reply({ content: errorMsg, ephemeral: true });
    }
  },
};
