# 🌍 Bilingual Support (Arabic & English)

This feature adds complete Arabic and English language support to TitanBot.

## 📋 Features

- **Automatic Language Detection**: Automatically detects user's preferred language
- **Easy Translation System**: Simple i18n (internationalization) implementation
- **Arabic Numerals Support**: Converts numbers to Arabic-Indic numerals when needed
- **Date Formatting**: Locale-aware date formatting
- **Command-based Language Switch**: `/language` command to change language

## 📁 File Structure

```
src/
├── config/i18n/
│   ├── translations.js       # All translations (AR/EN)
│   └── languageService.js    # Language service & utilities
├── middleware/
│   └── languageMiddleware.js # Middleware for integration
└── commands/Core/
    └── language.js           # Language switch command
```

## 🚀 Usage

### For Users
```
/language en    # Switch to English
/language ar    # Switch to Arabic
```

### For Developers

#### 1. Get User Language
```javascript
import { LanguageService } from '../config/i18n/languageService.js';

const languageService = new LanguageService(database);
const userLanguage = await languageService.getUserLanguage(userId, guildId);
```

#### 2. Translate Text
```javascript
import { translate } from '../config/i18n/languageService.js';

const message = translate('en', 'general.success');
// Output: ✅ Success!

const message = translate('ar', 'general.success');
// Output: ✅ تم بنجاح!
```

#### 3. With Parameters
```javascript
import { translate } from '../config/i18n/languageService.js';

const message = translate('en', 'moderation.banned', { user: 'John' });
// Output: ✅ User banned: **John**

const message = translate('ar', 'moderation.banned', { user: 'أحمد' });
// Output: ✅ تم حظر المستخدم: **أحمد**
```

#### 4. In Commands
```javascript
import { LanguageService, translate } from '../../config/i18n/languageService.js';

export default {
  data: new SlashCommandBuilder()
    .setName('example')
    .setDescription('Example command'),

  async execute(interaction, database) {
    const languageService = new LanguageService(database);
    const language = await languageService.getUserLanguage(
      interaction.user.id,
      interaction.guildId
    );
    
    const message = translate(language, 'general.success');
    await interaction.reply(message);
  },
};
```

#### 5. Format Numbers
```javascript
import { formatNumber } from '../config/i18n/languageService.js';

formatNumber(123456, 'en');  // 123,456
formatNumber(123456, 'ar');  // ١٢٣٬٤٥٦
```

#### 6. Format Dates
```javascript
import { formatDate } from '../config/i18n/languageService.js';

const date = new Date();
formatDate(date, 'en');  // August 29, 2026
formatDate(date, 'ar');  // ٢٩ أغسطس ٢٠٢٦
```

## 📚 Translation Keys

### General
- `general.noPermission` - Permission denied message
- `general.commandError` - Command error message
- `general.success` - Success message

### Help
- `help.title` - Help menu title
- `help.description` - Help description

### Economy
- `economy.balance` - Balance label
- `economy.dailyReward` - Daily reward message
- `economy.notEnoughMoney` - Not enough money error

### Moderation
- `moderation.banned` - User banned message
- `moderation.kicked` - User kicked message
- `moderation.warned` - User warned message

### Music
- `music.nowPlaying` - Now playing message
- `music.queue` - Queue label
- `music.notInVoiceChannel` - Not in voice channel error

### Leveling
- `leveling.levelUp` - Level up message
- `leveling.currentLevel` - Current level label

### And many more...

## 🔧 Configuration

Language preferences are stored in the database using keys:
- User preference: `guild:{guildId}:user:{userId}:language`
- Guild default: `guild:{guildId}:language`

## 🌐 Supported Languages

| Language | Code | Flag |
|----------|------|------|
| English  | `en` | 🇺🇸  |
| Arabic   | `ar` | 🇸🇦  |

## 🚦 Default Behavior

- **Default Language**: English (`en`)
- **Fallback**: If translation not found, returns the key itself
- **Auto-detection**: System automatically detects user's set language

## 📝 Adding New Translations

To add new translations, edit `src/config/i18n/translations.js`:

```javascript
export const translations = {
  ar: {
    newCategory: {
      newKey: 'ترجمة عربية',
    },
  },
  en: {
    newCategory: {
      newKey: 'English translation',
    },
  },
};
```

Then use it:
```javascript
translate('en', 'newCategory.newKey');
translate('ar', 'newCategory.newKey');
```

## 🐛 Troubleshooting

### Translation not showing
- Check the key path is correct
- Verify the language code is supported
- Check for typos in the translation key

### Language not changing
- Ensure database is working properly
- Check user has correct permissions
- Verify the language code is valid (`en` or `ar`)

## 📖 Related Documentation

- [Translation Keys](./translations.js)
- [Language Service](./languageService.js)
- [Language Command](../commands/Core/language.js)

## 🎯 Future Enhancements

- [ ] Add more languages (Spanish, French, etc.)
- [ ] Context-aware translations
- [ ] Plural handling
- [ ] Gender-specific translations
- [ ] RTL support for Arabic
- [ ] Translation management dashboard
