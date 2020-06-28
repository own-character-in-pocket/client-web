import { CardInformation } from "App/Pages/CardInformation";
import { CardList } from "App/Pages/CardList";
import { Main } from "App/Pages/Main";
import { CARD_INFORMATION, CARD_LIST, MAIN } from "constants/Routes";
import { Size } from "constants/Size";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Layout = styled.main`
  margin-left: ${Size.SIDEBAR_WIDTH_PX};
`;

export const MainLayoutRouteList = [MAIN, CARD_LIST, CARD_INFORMATION];

export const MainLayout = () => (
  <>
    <Sidebar />
    <Layout>
      <Switch>
        <Route path={MAIN} component={Main} exact />
        <Route path={CARD_LIST} component={CardList} exact />
        <Route path={CARD_INFORMATION} component={CardInformation} exact />
        <Redirect to={MAIN} />
      </Switch>
    </Layout>
  </>
);
