import React, { CSSProperties, FC } from "react";
import styles from "./styles.module.css";
import classNames from "classcat";

type ComponentProps = {
  className?: string;
  style?: CSSProperties;
  title?: string;
};

type Props = {
  className?: string;
  style?: CSSProperties;
  component: FC<ComponentProps>;
  description?: string;
};

export const Icon = ({ className, style, component: Component, description }: Props) => (
  <Component className={classNames([styles.layout, className])} style={style} title={description} />
);
