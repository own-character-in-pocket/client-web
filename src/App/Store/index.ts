import { Reducer } from "react";
import { loadLocale } from "services/loadLocale";
import { combineReducers, createStore } from "utils/store";
import { LocaleActions as Locale } from "./Locale";
import { UserActions as User } from "./User";

const reducers = { Locale, User };

const reducer = combineReducers(reducers);

export type AppStore = {
  [key in keyof typeof reducers]: typeof reducers[key] extends Reducer<infer S, any> ? S : never;
};

export const {
  StoreProvider: AppStoreProvider,
  useStore: useAppStore,
  useSelector: useAppSelector,
  useDispatch: useAppDispatch
} = createStore(reducer);

export const useTranslation = () => {
  const [{ message, node, locales }, dispatch] = useAppStore(store => store.Locale);

  const changeLanguage = async (language: string) => {
    const locale = locales[language] ?? (await loadLocale(language)).locales;
    dispatch(Locale.setCurrentLanguage({ language, locale }));
  };

  return { message, node, changeLanguage };
};
