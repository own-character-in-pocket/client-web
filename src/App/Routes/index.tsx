import { CardInformation } from "App/Pages/CardInformation";
import { CardList } from "App/Pages/CardList";
import { Main } from "App/Pages/Main";
import { CARD_INFORMATION, CARD_LIST, MAIN } from "constants/Routes";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const Routes = () => (
  <Switch>
    <Route path={MAIN} component={Main} exact />
    <Route path={CARD_LIST} component={CardList} exact />
    <Route path={CARD_INFORMATION} component={CardInformation} exact />
    <Redirect to={MAIN} />
  </Switch>
);
