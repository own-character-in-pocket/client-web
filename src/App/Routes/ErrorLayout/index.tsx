import { NotFound } from "App/Pages/NotFound";
import React from "react";
import { Route } from "react-router";
import styled from "styled-components";

const Layout = styled.div``;

export const ErrorLayout = () => (
  <Layout>
    <Route component={NotFound} />
  </Layout>
);
