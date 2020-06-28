import React, { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

const Layout = styled.button`
  cursor: pointer;
`;

export const ButtonType = {
  Normal: "button",
  Submit: "submit",
  Reset: "reset"
} as const;

export type ButtonType = typeof ButtonType[keyof typeof ButtonType];

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  type?: ButtonType;
  description?: string;
  tabIndex?: number;
  onClick?: () => void;
};

export const Button = ({ className, style, children, type = ButtonType.Normal, description, tabIndex, onClick }: Props) => (
  <Layout className={className} style={style} type={type} title={description} tabIndex={tabIndex} onClick={onClick}>
    {children}
  </Layout>
);
