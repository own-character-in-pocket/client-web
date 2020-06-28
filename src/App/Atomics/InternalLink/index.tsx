import React, { CSSProperties, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Layout = styled(NavLink)`
  &.active {
    cursor: default;
    pointer-events: none;
  }
`;

type Props = {
  className?: string;
  style?: CSSProperties;
  to: string;
  query?: Record<string, any>;
  description?: string;
  isExact?: boolean;
  tabIndex?: number;
  children: ReactNode;
};

export const InternalLink = ({ className, style, to, query, description, isExact = false, tabIndex, children }: Props) => {
  const urlSearchParams = new window.URLSearchParams(query);
  const href = [to, urlSearchParams.toString()].filter(Boolean).join("?");

  return (
    <Layout className={className} style={style} to={href} title={description} exact={isExact} tabIndex={tabIndex}>
      {children}
    </Layout>
  );
};
