import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import { LanguageService, SUPPORTED_LANGUAGES, translate } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('language')
    .setDescription('Change server language / غير لغة السيرفر')
    .addStringOption(option =>
      option
        .setName('lang')
        .setDescription('Choose a language / اختر لغة')
        .setRequired(true)
        .addChoices(
          { name: 'English 🇺🇸', value: 'en' },
          { name: 'العربية 🇸🇦', value: 'ar' }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),

  async execute(interaction, database) {
    const selectedLanguage = interaction.options.getString('lang');
    const languageService = new LanguageService(database);

    try {
      // تغيير اللغة للسيرفر كله
      await languageService.setGuildLanguage(
        interaction.guildId,
        selectedLanguage
      );

      const langInfo = SUPPORTED_LANGUAGES[selectedLanguage];
      const message = translate(selectedLanguage, 'settings.languageChanged');

      const embed = new EmbedBuilder()
        .setColor('#5865F2')
        .setTitle(`${langInfo.flag} ${langInfo.nativeName}`)
        .setDescription(message)
        .addFields(
          { name: '📌 تم التطبيق على', value: `جميع أعضاء السيرفر` }
        )
        .setFooter({ text: 'Server language changed | تم تغيير لغة السيرفر' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error in language command:', error);
      const errorMsg = translate(selectedLanguage || 'ar', 'general.commandError');
      await interaction.reply({ content: errorMsg, ephemeral: true });
    }
  },
};
