import { AppStore, useAppSelector } from "App/Store";
import React, { FC } from "react";

type Props = {
  path: string;
  component: FC;
  fallback: FC;
  exact?: boolean;
  isAuthorized: (store: AppStore) => boolean;
};

export const RestrictedRoute = ({ component: Component, fallback: Fallback, isAuthorized }: Props) => {
  const store = useAppSelector(store => store);
  return isAuthorized(store) ? <Component /> : <Fallback />;
};
