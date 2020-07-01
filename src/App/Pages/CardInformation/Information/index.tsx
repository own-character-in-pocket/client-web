import { Card } from "App/Atomics/Card";
import React from "react";
import styled from "styled-components";
import { Image } from "App/Atomics/Image";

const Layout = styled.div``;

type Props = {
  id: string;
  thumbnail: string;
  displayName: string;
};

export const Information = ({ id, thumbnail, displayName }: Props) => (
  <Layout>
    <Card top={<Image source={thumbnail} />} bottom={displayName} />
  </Layout>
);
