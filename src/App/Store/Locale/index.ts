import { negotiateLanguages } from "@fluent/langneg";
import { Localization } from "App/Store/Locale/Localization";
import { immerable } from "immer";
import { createDuck } from "utils/store";

const load = (url: string) => fetch([url, Date.now()].join("?")).then(response => response.json());

export const loadLocale = (language: string) =>
  load(`/_locales/${language}/message.json`).then(locales => ({ code: language, locales: Localization.of(locales) }));

export const loadLocaleInformation = async () => {
  const { fallbackLanguage, supportLanguageList } = await load("/_locales/index.json");
  const browserLanguage = window.navigator.language;
  const currentLanguage = negotiateLanguages([browserLanguage], supportLanguageList)[0] ?? fallbackLanguage;
  const locales = await Promise.all(
    [currentLanguage, currentLanguage !== fallbackLanguage && fallbackLanguage].filter(Boolean).map(loadLocale)
  );
  return { currentLanguage, fallbackLanguage, supportLanguageList, locales };
};

export type InitialLocaleStateProps = {
  currentLanguage: string;
  fallbackLanguage: string;
  supportLanguageList: string[];
  locales: Array<{ code: string; locales: Localization }>;
};

export class LocaleState {
  static of(
    {
      currentLanguage = "en",
      fallbackLanguage = currentLanguage,
      supportLanguageList = [currentLanguage],
      locales = []
    }: InitialLocaleStateProps = {} as InitialLocaleStateProps
  ) {
    return new LocaleState(
      currentLanguage,
      fallbackLanguage,
      supportLanguageList,
      locales.reduce((record, { code, locales }) => {
        record[code] = locales;
        return record;
      }, {} as Record<string, Localization>)
    );
  }

  readonly [immerable] = true;

  private constructor(
    public currentLanguage: string,
    public fallbackLanguage: string,
    public supportLanguageList: string[],
    public locales: Record<string, Localization>
  ) {
    window.document.documentElement.lang = currentLanguage;
  }

  get message() {
    return (key: string) => this.locales[this.currentLanguage]?.message(key) ?? this.locales[this.fallbackLanguage]?.message(key) ?? key;
  }

  get node() {
    return (key: string) => this.locales[this.currentLanguage]?.node(key) ?? this.locales[this.fallbackLanguage]?.node(key) ?? key;
  }
}

export const createInitialState = LocaleState.of;

export const LocaleActions = createDuck({
  namespace: "Locale",
  createInitialState,
  reducers: {
    setCurrentLanguage(state, { language, locale }: { language: string; locale: Localization }) {
      state.currentLanguage = language;
      state.locales[language] = locale;
    },
    setFallbackLanguage(state, language: string) {
      state.fallbackLanguage = language;
    }
  },
  afterChange(previous, next) {
    if (previous.currentLanguage !== next.currentLanguage) {
      window.document.documentElement.lang = next.currentLanguage;
    }
  }
});
