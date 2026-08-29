import { t, translations } from './translations.js';

/**
 * Language configuration and management
 */

export const SUPPORTED_LANGUAGES = {
  en: {
    name: 'English',
    flag: '🇺🇸',
    code: 'en',
    nativeName: 'English',
  },
  ar: {
    name: 'Arabic',
    flag: '🇸🇦',
    code: 'ar',
    nativeName: 'العربية',
  },
};

export const DEFAULT_LANGUAGE = 'ar';

/**
 * Language service for managing user language preferences
 */
export class LanguageService {
  constructor(database) {
    this.db = database;
  }

  /**
   * Get user's preferred language
   * @param {string} userId - Discord user ID
   * @param {string} guildId - Discord guild ID
   * @returns {Promise<string>} Language code
   */
  async getUserLanguage(userId, guildId) {
    try {
      const key = `guild:${guildId}:user:${userId}:language`;
      const language = await this.db.get(key);
      return language || DEFAULT_LANGUAGE;
    } catch (error) {
      console.error('Error getting user language:', error);
      return DEFAULT_LANGUAGE;
    }
  }

  /**
   * Set user's language preference
   * @param {string} userId - Discord user ID
   * @param {string} guildId - Discord guild ID
   * @param {string} language - Language code
   * @returns {Promise<boolean>} Success status
   */
  async setUserLanguage(userId, guildId, language) {
    if (!SUPPORTED_LANGUAGES[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    try {
      const key = `guild:${guildId}:user:${userId}:language`;
      await this.db.set(key, language);
      return true;
    } catch (error) {
      console.error('Error setting user language:', error);
      return false;
    }
  }

  /**
   * Get server's default language
   * @param {string} guildId - Discord guild ID
   * @returns {Promise<string>} Language code
   */
  async getGuildLanguage(guildId) {
    try {
      const key = `guild:${guildId}:language`;
      const language = await this.db.get(key);
      return language || DEFAULT_LANGUAGE;
    } catch (error) {
      console.error('Error getting guild language:', error);
      return DEFAULT_LANGUAGE;
    }
  }

  /**
   * Set server's default language
   * @param {string} guildId - Discord guild ID
   * @param {string} language - Language code
   * @returns {Promise<boolean>} Success status
   */
  async setGuildLanguage(guildId, language) {
    if (!SUPPORTED_LANGUAGES[language]) {
      throw new Error(`Unsupported language: ${language}`);
    }

    try {
      const key = `guild:${guildId}:language`;
      await this.db.set(key, language);
      return true;
    } catch (error) {
      console.error('Error setting guild language:', error);
      return false;
    }
  }

  /**
   * Get translation with automatic language detection
   * @param {string} userId - Discord user ID
   * @param {string} guildId - Discord guild ID
   * @param {string} key - Translation key
   * @param {object} params - Parameters
   * @returns {Promise<string>} Translated text
   */
  async getTranslation(userId, guildId, key, params = {}) {
    const language = await this.getUserLanguage(userId, guildId);
    return t(language, key, params);
  }

  /**
   * Get all supported languages info
   * @returns {object} Languages info
   */
  getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  /**
   * Check if language is supported
   * @param {string} language - Language code
   * @returns {boolean} Is supported
   */
  isLanguageSupported(language) {
    return !!SUPPORTED_LANGUAGES[language];
  }
}

/**
 * Translate function with language fallback
 * @param {string} language - Language code
 * @param {string} key - Translation key
 * @param {object} params - Parameters
 * @returns {string} Translated text
 */
export function translate(language, key, params = {}) {
  return t(language, key, params);
}

/**
 * Get language info
 * @param {string} language - Language code
 * @returns {object} Language info
 */
export function getLanguageInfo(language) {
  return SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
}

/**
 * Format number with language-specific formatting
 * @param {number} num - Number to format
 * @param {string} language - Language code
 * @returns {string} Formatted number
 */
export function formatNumber(num, language = 'ar') {
  if (language === 'ar') {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/\d/g, digit => arabicNumbers[digit]);
  }
  return new Intl.NumberFormat(language).format(num);
}

/**
 * Format date with language-specific formatting
 * @param {Date} date - Date to format
 * @param {string} language - Language code
 * @returns {string} Formatted date
 */
export function formatDate(date, language = 'ar') {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat(language, options).format(date);
}

export default {
  LanguageService,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  translate,
  getLanguageInfo,
  formatNumber,
  formatDate,
  t,
  getCategory,
  translations,
};
