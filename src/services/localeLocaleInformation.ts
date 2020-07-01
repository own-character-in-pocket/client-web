import { negotiateLanguages } from "@fluent/langneg";
import { err, ok, Result } from "utils/functionals";
import { load } from "./load";
import { loadLocale, LocaleItem } from "./loadLocale";

type Item = {
  currentLanguage: string;
  fallbackLanguage: string;
  supportLanguageList: string[];
  locales: LocaleItem[];
};

export const loadLocaleInformation = async (): Promise<Result<Item, any>> => {
  try {
    const { fallbackLanguage, supportLanguageList } = await load("/_locales/index.json");
    const browserLanguage = window.navigator.language;
    const currentLanguage = negotiateLanguages([browserLanguage], supportLanguageList)[0] ?? fallbackLanguage;
    const locales = await Promise.all(
      [currentLanguage, currentLanguage !== fallbackLanguage && fallbackLanguage].filter(Boolean).map(loadLocale)
    );
    return ok({ currentLanguage, fallbackLanguage, supportLanguageList, locales });
  } catch (error) {
    return err(error);
  }
};
