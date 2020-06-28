import React, { CSSProperties, FormEvent, ReactNode } from "react";
import styled from "styled-components";

const Layout = styled.form``;

const preventDefault = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export const Form = ({ className, style, children }: Props) => (
  <Layout className={className} style={style} onSubmit={preventDefault}>
    {children}
  </Layout>
);
