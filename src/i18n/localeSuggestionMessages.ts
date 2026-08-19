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
    },
  },
};
