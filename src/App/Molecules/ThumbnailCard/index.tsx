import { Card } from "App/Atomics/Card";
import { Image } from "App/Atomics/Image";
import { InternalLink } from "App/Atomics/InternalLink";
import React from "react";

type Props = {
  to: string;
  source: string;
  title: string;
};

export const ThumbnailCard = ({ to, source, title }: Props) => (
  <InternalLink to={to}>
    <Card top={<Image source={source} description="thumbanil" />} bottom={title} />
  </InternalLink>
);
