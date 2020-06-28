import { CARD_INFORMATION, CARD_LIST, MAIN } from "constants/Routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { MainLayout } from "./MainLayout";

export const Routes = () => (
  <Switch>
    <Route path={[MAIN, CARD_INFORMATION, CARD_LIST]} component={MainLayout} exact />
    <Redirect to={MAIN} />
  </Switch>
);
