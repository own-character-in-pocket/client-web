import { Localization } from "App/Store/Locale/Localization";
import { load } from "./load";

export type LocaleItem = {
  code: string;
  locales: Localization;
};

type Item = LocaleItem;

export const loadLocale = async (language: string): Promise<Item> => {
  const response = await load(`/_locales/${language}/message.json`);
  const locales = await response.json();
  return { code: language, locales: Localization.of(locales) };
};
