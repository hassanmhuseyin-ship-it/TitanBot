import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your balance / تحقق من رصيدك')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to check balance / المستخدم')
        .setRequired(false)
    ),

  async execute(interaction, database) {
    const languageService = new LanguageService(database);
    const language = await languageService.getUserLanguage(
      interaction.user.id,
      interaction.guildId
    );
    const { translate } = await import('../../config/i18n/languageService.js');

    const targetUser = interaction.options.getUser('user') || interaction.user;
    const balance = await database.get(`guild:${interaction.guildId}:user:${targetUser.id}:balance`) || 0;

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL() })
      .setDescription(translate(language, 'economy.balance') + ` **${balance}** 💰`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
