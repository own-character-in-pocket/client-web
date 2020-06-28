import { loadLocaleInformation } from "App/Store/Locale";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

declare const Root: HTMLDivElement;

loadLocaleInformation().then(localeInformations => {
  ReactDOM.render(<App {...localeInformations} />, Root);
});

serviceWorker.unregister();
