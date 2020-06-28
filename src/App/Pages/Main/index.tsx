import { BaseLayout } from "App/Layouts/BaseLayout";
import { Size } from "constants/Size";
import React from "react";
import styled from "styled-components";

const Layout = styled(BaseLayout)`
  padding: ${Size.PADDING_PX};
`;

export const Main = () => <Layout>Main</Layout>;
