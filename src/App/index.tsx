import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import { AppStoreProvider } from "./Store";
import { createInitialState, InitialLocaleStateProps } from "./Store/Locale";
import "./styles";

const createInitialStore = ({ currentLanguage, fallbackLanguage, supportLanguageList, locales }: Props) => ({
  Locale: createInitialState({ currentLanguage, fallbackLanguage, supportLanguageList, locales })
});

type Props = InitialLocaleStateProps;

export const App = (props: Props) => (
  <BrowserRouter>
    <AppStoreProvider createInitialStore={createInitialStore} args={props}>
      <Routes />
    </AppStoreProvider>
  </BrowserRouter>
);
