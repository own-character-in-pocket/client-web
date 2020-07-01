import { Localization } from "App/Store/Locale/Localization";
import { immerable } from "immer";
import { createDuck } from "utils/store";

type State = LocaleState;

type InitialLocaleStateProps = {
  currentLanguage?: string;
  fallbackLanguage?: string;
  supportLanguageList?: string[];
  locales?: Array<{ code: string; locales: Localization }>;
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

const createInitialState = (): State => {
  throw new Error("Unreachable");
};

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
