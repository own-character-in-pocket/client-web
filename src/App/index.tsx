import React from "react";
import { BrowserRouter } from "react-router-dom";
import { loadLocaleInformation } from "services/localeLocaleInformation";
import { Result } from "utils/functionals";
import { lazyComponent } from "utils/lazy-component";
import { Routes } from "./Routes";
import { AppStore, AppStoreProvider } from "./Store";
import { LocaleState } from "./Store/Locale";
import "./styles";

export const App = lazyComponent({
  async load() {
    const locale = await loadLocaleInformation();
    const localeState = LocaleState.of(locale.unwrapOr({} as typeof locale extends Result<infer T, any> ? T : never));
    const args: AppStore = { Locale: localeState, User: { avatar: null } };

    return () => (
      <BrowserRouter>
        <AppStoreProvider args={args}>
          <Routes />
        </AppStoreProvider>
      </BrowserRouter>
    );
  }
});
