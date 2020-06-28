import React from "react";
import styled from "styled-components";

const Layout = styled.img``;

type Props = {
  source: string;
  description?: string;
};

export const Image = ({ source, description }: Props) => <Layout src={source} alt={description} />;
