import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { LanguageService } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily reward / اطلب مكافأتك اليومية'),

  async execute(interaction, database) {
    const languageService = new LanguageService(database);
    const language = await languageService.getUserLanguage(
      interaction.user.id,
      interaction.guildId
    );
    const { translate } = await import('../../config/i18n/languageService.js');

    const lastClaimedKey = `guild:${interaction.guildId}:user:${interaction.user.id}:dailyLastClaimed`;
    const balanceKey = `guild:${interaction.guildId}:user:${interaction.user.id}:balance`;
    
    const lastClaimed = await database.get(lastClaimedKey);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours

    if (lastClaimed && (now - lastClaimed) < cooldown) {
      const timeLeft = Math.ceil((cooldown - (now - lastClaimed)) / 1000 / 60 / 60);
      const message = translate(language, 'economy.dailyAlreadyClaimed', { time: `${timeLeft}h` });
      return await interaction.reply({ content: message, ephemeral: true });
    }

    const reward = 500;
    const currentBalance = (await database.get(balanceKey)) || 0;
    await database.set(balanceKey, currentBalance + reward);
    await database.set(lastClaimedKey, now);

    const message = translate(language, 'economy.dailyReward', { amount: reward, currency: '💰' });
    await interaction.reply({ content: message });
  },
};
