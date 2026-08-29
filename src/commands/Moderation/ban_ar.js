import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user / احظر مستخدم')
    .addUserOption(option =>
      option.setName('user').setDescription('User to ban').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason').setDescription('Ban reason / السبب').setRequired(false)
    ),

  async execute(interaction, database) {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      const languageService = new LanguageService(database);
      const language = await languageService.getUserLanguage(
        interaction.user.id,
        interaction.guildId
      );
      const { translate } = await import('../../config/i18n/languageService.js');
      const message = translate(language, 'general.noPermission');
      return await interaction.reply({ content: message, ephemeral: true });
    }

    const languageService = new LanguageService(database);
    const language = await languageService.getUserLanguage(
      interaction.user.id,
      interaction.guildId
    );
    const { translate } = await import('../../config/i18n/languageService.js');

    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    try {
      await targetUser.send(`You have been banned from ${interaction.guild.name}. Reason: ${reason}`);
    } catch (e) {
      console.log('Could not DM user');
    }

    await interaction.guild.members.ban(targetUser, { reason });
    const message = translate(language, 'moderation.banned', { user: targetUser.username });
    
    const embed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription(message)
      .addFields(
        { name: translate(language, 'moderation.reason'), value: reason },
        { name: translate(language, 'moderation.moderator'), value: interaction.user.username }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
