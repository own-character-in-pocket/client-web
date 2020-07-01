import { AppStore, useAppSelector } from "App/Store";
import React, { FC } from "react";
import { Route } from "react-router";

type Props = {
  path: string;
  component: FC;
  fallback: FC;
  exact?: boolean;
  isAuthorized: (store: AppStore) => boolean;
};

export const RestrictedRoute = ({ path, component: Component, fallback: Fallback, isAuthorized }: Props) => {
  const store = useAppSelector(store => store);
  return isAuthorized(store) ? <Route path={path} component={Component} /> : <Fallback />;
};
