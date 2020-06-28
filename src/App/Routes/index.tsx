import React from "react";
import { Route, Switch } from "react-router-dom";
import { ErrorLayout } from "./ErrorLayout";
import { MainLayout, MainLayoutRouteList } from "./MainLayout";

export const Routes = () => (
  <Switch>
    <Route path={MainLayoutRouteList} component={MainLayout} exact />
    <Route component={ErrorLayout} />
  </Switch>
);
