import { Size } from "constants/Size";
import React, { ReactNode, CSSProperties } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Main = styled.main`
  margin-left: ${Size.SIDEBAR_WIDTH_PX};
`;

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export const BaseLayout = ({ className, style, children }: Props) => (
  <>
    <Sidebar />
    <Main className={className} style={style}>
      {children}
    </Main>
  </>
);
