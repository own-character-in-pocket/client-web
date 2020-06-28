import { Size } from "constants/Size";
import React from "react";
import styled from "styled-components";
import { FieldGroupList } from "./FieldGroupList";
import { Information } from "./Information";
import { Relationships } from "./Relationships";

const Layout = styled.div`
  padding: ${Size.PADDING_PX};
`;

export const CardInformation = () => (
  <Layout>
    <Information />
    <FieldGroupList />
    <Relationships />
  </Layout>
);
