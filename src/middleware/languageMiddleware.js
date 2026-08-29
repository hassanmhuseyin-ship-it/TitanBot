/**
 * Multi-language support middleware for TitanBot
 * Automatically injects language service and translation functions
 */

import { LanguageService } from '../config/i18n/languageService.js';

/**
 * Initialize language middleware
 * @param {Client} client - Discord client
 * @param {object} database - Database connection
 */
export function initializeLanguageMiddleware(client, database) {
  const languageService = new LanguageService(database);

  // Attach language service to client
  client.languageService = languageService;

  // Store in client for global access
  client.on('ready', () => {
    console.log('✅ Language middleware initialized');
  });

  return languageService;
}

/**
 * Get language from interaction
 * @param {Interaction} interaction - Discord interaction
 * @param {LanguageService} languageService - Language service
 * @returns {Promise<string>} Language code
 */
export async function getInteractionLanguage(interaction, languageService) {
  if (!interaction.user || !interaction.guildId) {
    return 'en';
  }

  return await languageService.getUserLanguage(
    interaction.user.id,
    interaction.guildId
  );
}

/**
 * Translate for interaction
 * @param {Interaction} interaction - Discord interaction
 * @param {string} key - Translation key
 * @param {object} params - Parameters
 * @param {LanguageService} languageService - Language service
 * @returns {Promise<string>} Translated text
 */
export async function translateInteraction(
  interaction,
  key,
  params = {},
  languageService
) {
  if (!languageService) {
    languageService = interaction.client.languageService;
  }

  if (!interaction.user || !interaction.guildId) {
    const { translate } = await import('../config/i18n/languageService.js');
    return translate('en', key, params);
  }

  return await languageService.getTranslation(
    interaction.user.id,
    interaction.guildId,
    key,
    params
  );
}

/**
 * Middleware for command execution
 * Adds language utilities to the context
 * @param {Interaction} interaction - Discord interaction
 * @param {object} options - Options
 * @returns {Promise<object>} Context with language utilities
 */
export async function createLanguageContext(interaction, options = {}) {
  const languageService = interaction.client.languageService;
  const language = await getInteractionLanguage(interaction, languageService);

  return {
    language,
    languageService,
    translate: (key, params = {}) => 
      languageService.getTranslation(
        interaction.user.id,
        interaction.guildId,
        key,
        params
      ),
    t: (key, params = {}) => {
      const { translate } = require('../config/i18n/languageService.js');
      return translate(language, key, params);
    },
  };
}

export default {
  initializeLanguageMiddleware,
  getInteractionLanguage,
  translateInteraction,
  createLanguageContext,
};
