import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

declare const Root: HTMLDivElement;

ReactDOM.render(<App />, Root);

serviceWorker.unregister();
