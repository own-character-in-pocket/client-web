import { BaseColor } from "constants/BaseColor";
import { Size } from "constants/Size";
import React, { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Layout = styled.div`
  overflow: hidden;

  position: relative;

  height: 0;

  padding-bottom: calc(100% + 1.5rem);

  border-radius: ${Size.BORDER_RADIUS_PX};

  transition-property: box-shadow;
  transition-timing-function: linear;

  &[data-is-clickable="true"] {
    cursor: pointer;
  }

  &:hover {
    box-shadow: 0 0 16px 0 ${BaseColor.GRAY_3};
  }
`;

const Top = styled.div`
  overflow: hidden;

  position: relative;

  padding-bottom: 100%;

  border-radius: ${Size.BORDER_RADIUS_PX};
`;

const Bottom = styled.div`
  position: relative;

  padding-bottom: 1.5rem;

  text-align: center;
`;

const Guard = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  height: 100%;
`;

type Props = {
  className?: string;
  style?: CSSProperties;
  top: ReactNode;
  bottom: ReactNode;
};

export const Card = ({ className, style, top, bottom }: Props) => (
  <Layout className={className} style={style}>
    <Top>
      <Guard>{top}</Guard>
    </Top>
    <Bottom>
      <Guard>{bottom}</Guard>
    </Bottom>
  </Layout>
);
