import { LanguageService } from '../config/i18n/languageService.js';
import { translate } from '../config/i18n/languageService.js';

/**
 * Initialize language middleware
 * @param {Client} client - Discord client
 */
export function initializeLanguageMiddleware(client) {
  const languageService = new LanguageService(client.db);
  
  // Attach language service to client
  client.languageService = languageService;
  
  console.log('✅ Language middleware initialized');
  return languageService;
}

/**
 * Get language from interaction
 * @param {Interaction} interaction - Discord interaction
 * @returns {Promise<string>} Language code
 */
export async function getInteractionLanguage(interaction) {
  if (!interaction.user || !interaction.guildId || !interaction.client.languageService) {
    return 'ar';
  }

  return await interaction.client.languageService.getUserLanguage(
    interaction.user.id,
    interaction.guildId
  );
}

/**
 * Translate for interaction
 * @param {Interaction} interaction - Discord interaction
 * @param {string} key - Translation key
 * @param {object} params - Parameters
 * @returns {Promise<string>} Translated text
 */
export async function translateInteraction(interaction, key, params = {}) {
  const language = await getInteractionLanguage(interaction);
  return translate(language, key, params);
}

/**
 * Create language context for command execution
 * @param {Interaction} interaction - Discord interaction
 * @returns {Promise<object>} Language context
 */
export async function createLanguageContext(interaction) {
  const language = await getInteractionLanguage(interaction);
  const languageService = interaction.client.languageService;

  return {
    language,
    languageService,
    translate: (key, params = {}) => translate(language, key, params),
    getTranslation: async (key, params = {}) => {
      return await languageService.getTranslation(
        interaction.user.id,
        interaction.guildId,
        key,
        params
      );
    },
  };
}

export default {
  initializeLanguageMiddleware,
  getInteractionLanguage,
  translateInteraction,
  createLanguageContext,
};
