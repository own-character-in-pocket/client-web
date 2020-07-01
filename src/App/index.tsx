import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { AppStore, AppStoreProvider } from "./Store";
import { createInitialState, InitialLocaleStateProps } from "./Store/Locale";
import "./styles";

const createInitialStore = ({ currentLanguage, fallbackLanguage, supportLanguageList, locales }: Props): AppStore => ({
  Locale: createInitialState({ currentLanguage, fallbackLanguage, supportLanguageList, locales }),
  User: {
    avatar: null
  }
});

type Props = InitialLocaleStateProps;

export const App = (props: Props) => (
  <BrowserRouter>
    <AppStoreProvider createInitialStore={createInitialStore} args={props}>
      <Routes />
    </AppStoreProvider>
  </BrowserRouter>
);
