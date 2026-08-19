import type { LocaleSuggestionMessages, SupportedLocale } from "./localePreference";

export const localeSuggestionMessages: Record<
  SupportedLocale,
  LocaleSuggestionMessages
> = {
  es: {
    title: "¿Prefieres otro idioma?",
    description: "¿Quieres ver esta página en {language}?",
    switchButton: "Cambiar",
    dismissButton: "No, gracias",
    languageNames: {
      es: "Español",
      en: "Inglés",
      pt: "Portugués",
      ar: "Árabe",
    },
  },
  en: {
    title: "Prefer another language?",
    description: "Would you like to view this page in {language}?",
    switchButton: "Switch",
    dismissButton: "No, thanks",
    languageNames: {
      es: "Spanish",
      en: "English",
      pt: "Portuguese",
      ar: "Arabic",
    },
  },
  pt: {
    title: "Prefere outro idioma?",
    description: "Quer ver esta página em {language}?",
    switchButton: "Trocar",
    dismissButton: "Não, obrigado",
    languageNames: {
      es: "Espanhol",
      en: "Inglês",
      pt: "Português",
      ar: "Árabe",
    },
  },
  ar: {
    title: "هل تفضل لغة أخرى؟",
    description: "هل تريد عرض هذه الصفحة باللغة {language}؟",
    switchButton: "تبديل",
    dismissButton: "لا، شكرًا",
    languageNames: {
      es: "الإسبانية",
      en: "الإنجليزية",
      pt: "البرتغالية",
      ar: "العربية",
    },
  },
};
