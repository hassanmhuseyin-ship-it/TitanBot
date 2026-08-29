import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Check your rank / تحقق من رتبتك')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('User to check / المستخدم')
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
    const level = (await database.get(`guild:${interaction.guildId}:user:${targetUser.id}:level`)) || 1;
    const xp = (await database.get(`guild:${interaction.guildId}:user:${targetUser.id}:xp`)) || 0;
    const nextLevelXP = level * 1000;

    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setAuthor({ name: targetUser.username, iconURL: targetUser.displayAvatarURL() })
      .addFields(
        { name: translate(language, 'leveling.currentLevel'), value: `${level}`, inline: true },
        { name: translate(language, 'leveling.currentXP'), value: `${xp}`, inline: true },
        { name: translate(language, 'leveling.nextLevel'), value: `${nextLevelXP}`, inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
