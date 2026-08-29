/**
 * Multi-language translation system for TitanBot
 * Supports: English (en), Arabic (ar)
 */

export const translations = {
  ar: {
    // General responses
    general: {
      noPermission: '❌ **خطأ:** ليس لديك الصلاحيات المطلوبة لتنفيذ هذا الأمر!',
      commandError: '❌ حدث خطأ أثناء تنفيذ الأمر. يرجى المحاولة لاحقاً.',
      invalidArguments: '❌ **خطأ:** معاملات غير صحيحة. تحقق من صيغة الأمر.',
      notImplemented: '⚠️ هذه الميزة قيد التطوير.',
      success: '✅ تم بنجاح!',
      cancelled: '❌ تم إلغاء العملية.',
    },

    // Help command
    help: {
      title: '📚 قائمة المساعدة',
      description: 'اختر فئة الأوامر لرؤية المزيد من التفاصيل:',
      noCommandsFound: '❌ لم يتم العثور على أوامر في هذه الفئة.',
      commandPrefix: 'البادئة:',
      commandDescription: 'الوصف:',
      commandUsage: 'الاستخدام:',
      commandAliases: 'الأسماء البديلة:',
    },

    // Economy
    economy: {
      balance: 'الرصيد:',
      notEnoughMoney: '❌ ليس لديك أموال كافية!',
      dailyReward: 'مكافأة يومية: **{amount}** {currency}',
      dailyAlreadyClaimed: '⏳ يمكنك المطالبة بالمكافأة اليومية مرة أخرى خلال: **{time}**',
      workEarned: '💼 عملت بجد وكسبت: **{amount}** {currency}',
      gambleWon: '🎰 فزت! كسبت: **{amount}** {currency}',
      gambleLost: '🎰 خسرت! فقدت: **{amount}** {currency}',
      shopBought: '✅ تم الشراء بنجاح!',
      shopPrice: 'السعر:',
      shopCategory: 'الفئة:',
    },

    // Moderation
    moderation: {
      banned: '✅ تم حظر المستخدم: **{user}**',
      kicked: '✅ تم طرد المستخدم: **{user}**',
      warned: '✅ تم تحذير المستخدم: **{user}**',
      notWarned: '❌ هذا المستخدم لم يتلق تحذيرات.',
      purged: '🧹 تم حذف **{count}** رسالة.',
      locked: '🔒 تم قفل القناة.',
      unlocked: '🔓 تم فتح القناة.',
      reason: 'السبب:',
      moderator: 'الموظف:',
      case: 'الحالة:',
    },

    // Music
    music: {
      nowPlaying: '🎵 يتم التشغيل الآن:',
      queue: '🎶 قائمة الانتظار',
      queueEmpty: '❌ قائمة الانتظار فارغة.',
      joined: '✅ تم الانضمام إلى قناة صوتية.',
      left: '✅ تم مغادرة قناة صوتية.',
      paused: '⏸️ تم إيقاف التشغيل.',
      resumed: '▶️ تم استئناف التشغيل.',
      skipped: '⏭️ تم تخطي الأغنية.',
      duration: 'المدة:',
      artist: 'الفنان:',
      notInVoiceChannel: '❌ يجب أن تكون في قناة صوتية!',
    },

    // Leveling
    leveling: {
      levelUp: '🎉 مبروك! {user} صعد المستوى إلى: **{level}**',
      currentLevel: 'المستوى الحالي:',
      currentXP: 'الخبرة:',
      nextLevel: 'الخبرة اللازمة للمستوى التالي:',
      leaderboard: '🏆 لوحة المتصدرين - الخبرة',
    },

    // Birthday
    birthday: {
      set: '✅ تم حفظ عيد ميلادك: **{date}**',
      celebrate: '🎂 عيد ميلاد سعيد **{user}**! 🎉',
      upcoming: '📅 أعياد ميلاد قريبة:',
    },

    // Verification
    verification: {
      verified: '✅ تم التحقق من هويتك بنجاح!',
      alreadyVerified: '⚠️ أنت بالفعل مُحقق.',
      pleaseVerify: '🔐 يرجى التحقق من هويتك لمتابعة الاستخدام.',
    },

    // Tickets
    ticket: {
      created: '✅ تم فتح تذكرة دعم جديدة.',
      closed: '✅ تم إغلاق التذكرة.',
      claimed: '✅ تم المطالبة بالتذكرة.',
      priority: 'الأولوية:',
      status: 'الحالة:',
    },

    // Giveaway
    giveaway: {
      started: '🎁 تم بدء السحب!',
      ended: '🎁 انتهى السحب!',
      winner: '🏆 الفائز:',
      participants: 'المشاركون:',
      reacted: 'شارك في السحب برد على هذه الرسالة بـ ✅',
    },

    // General messages
    messages: {
      loadingDots: 'جاري التحميل...',
      confirmAction: 'هل تؤكد هذا الإجراء؟',
      yes: 'نعم',
      no: 'لا',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      close: 'إغلاق',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
    },

    // Settings
    settings: {
      language: 'اللغة',
      languageChanged: '✅ تم تغيير اللغة إلى: **العربية**',
      currentLanguage: 'اللغة الحالية:',
    },
  },

  en: {
    // General responses
    general: {
      noPermission: '❌ **Error:** You do not have permission to execute this command!',
      commandError: '❌ An error occurred while executing the command. Please try again later.',
      invalidArguments: '❌ **Error:** Invalid arguments. Check the command format.',
      notImplemented: '⚠️ This feature is under development.',
      success: '✅ Success!',
      cancelled: '❌ Operation cancelled.',
    },

    // Help command
    help: {
      title: '📚 Help Menu',
      description: 'Select a command category to see more details:',
      noCommandsFound: '❌ No commands found in this category.',
      commandPrefix: 'Prefix:',
      commandDescription: 'Description:',
      commandUsage: 'Usage:',
      commandAliases: 'Aliases:',
    },

    // Economy
    economy: {
      balance: 'Balance:',
      notEnoughMoney: '❌ You do not have enough money!',
      dailyReward: 'Daily Reward: **{amount}** {currency}',
      dailyAlreadyClaimed: '⏳ You can claim your daily reward again in: **{time}**',
      workEarned: '💼 You worked hard and earned: **{amount}** {currency}',
      gambleWon: '🎰 You won! Earned: **{amount}** {currency}',
      gambleLost: '🎰 You lost! Lost: **{amount}** {currency}',
      shopBought: '✅ Purchased successfully!',
      shopPrice: 'Price:',
      shopCategory: 'Category:',
    },

    // Moderation
    moderation: {
      banned: '✅ User banned: **{user}**',
      kicked: '✅ User kicked: **{user}**',
      warned: '✅ User warned: **{user}**',
      notWarned: '❌ This user has no warnings.',
      purged: '🧹 Deleted **{count}** messages.',
      locked: '🔒 Channel locked.',
      unlocked: '🔓 Channel unlocked.',
      reason: 'Reason:',
      moderator: 'Moderator:',
      case: 'Case:',
    },

    // Music
    music: {
      nowPlaying: '🎵 Now Playing:',
      queue: '🎶 Queue',
      queueEmpty: '❌ Queue is empty.',
      joined: '✅ Joined voice channel.',
      left: '✅ Left voice channel.',
      paused: '⏸️ Playback paused.',
      resumed: '▶️ Playback resumed.',
      skipped: '⏭️ Song skipped.',
      duration: 'Duration:',
      artist: 'Artist:',
      notInVoiceChannel: '❌ You must be in a voice channel!',
    },

    // Leveling
    leveling: {
      levelUp: '🎉 Congratulations! {user} leveled up to: **{level}**',
      currentLevel: 'Current Level:',
      currentXP: 'Experience:',
      nextLevel: 'XP needed for next level:',
      leaderboard: '🏆 Leaderboard - Experience',
    },

    // Birthday
    birthday: {
      set: '✅ Your birthday has been saved: **{date}**',
      celebrate: '🎂 Happy Birthday **{user}**! 🎉',
      upcoming: '📅 Upcoming Birthdays:',
    },

    // Verification
    verification: {
      verified: '✅ You have been verified successfully!',
      alreadyVerified: '⚠️ You are already verified.',
      pleaseVerify: '🔐 Please verify yourself to continue using this server.',
    },

    // Tickets
    ticket: {
      created: '✅ Support ticket created.',
      closed: '✅ Ticket closed.',
      claimed: '✅ Ticket claimed.',
      priority: 'Priority:',
      status: 'Status:',
    },

    // Giveaway
    giveaway: {
      started: '🎁 Giveaway started!',
      ended: '🎁 Giveaway ended!',
      winner: '🏆 Winner:',
      participants: 'Participants:',
      reacted: 'React to participate in the giveaway with ✅',
    },

    // General messages
    messages: {
      loadingDots: 'Loading...',
      confirmAction: 'Do you confirm this action?',
      yes: 'Yes',
      no: 'No',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
    },

    // Settings
    settings: {
      language: 'Language',
      languageChanged: '✅ Language changed to: **English**',
      currentLanguage: 'Current Language:',
    },
  },
};

/**
 * Get translation for a key
 * @param {string} language - Language code (en/ar)
 * @param {string} key - Translation key (e.g., 'general.noPermission')
 * @param {object} params - Parameters to replace in translation (optional)
 * @returns {string} Translated text
 */
export function t(language = 'ar', key, params = {}) {
  const keys = key.split('.');
  let value = translations[language] || translations.ar;

  for (const k of keys) {
    value = value?.[k];
    if (!value) return key;
  }

  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (match, paramName) => {
      return params[paramName] ?? match;
    });
  }

  return value;
}

/**
 * Get all translations for a category
 * @param {string} language - Language code
 * @param {string} category - Category name
 * @returns {object} Category translations
 */
export function getCategory(language = 'ar', category) {
  return translations[language]?.[category] || translations.ar[category];
}
