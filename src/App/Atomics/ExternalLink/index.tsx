import React, { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Layout = styled.a``;

type ParentProps = {
  isParent: true;
  isTop?: false;
  isBlank?: false;
};

type TopProps = {
  isParent?: false;
  isTop: true;
  isBlank?: false;
};

type BlankProps = {
  isParent?: false;
  isTop?: false;
  isBlank: true;
};

type TargetProps = ParentProps | TopProps | BlankProps;

type Props = {
  className?: string;
  style?: CSSProperties;
  to: string;
  query?: Record<string, any>;
  tabIndex?: number;
  children: ReactNode;
} & TargetProps;

export const ExternalLink = ({ className, style, to, query, children, tabIndex, isParent, isTop, isBlank }: Props) => {
  const target = isParent ? "_parent" : isTop ? "_top" : isBlank ? "_blank" : "_self";
  const urlSearchParams = new window.URLSearchParams(query);
  const href = [to, urlSearchParams.toString()].filter(Boolean).join("?");

  return (
    <Layout className={className} style={style} href={href} target={target} tabIndex={tabIndex}>
      {children}
    </Layout>
  );
};
