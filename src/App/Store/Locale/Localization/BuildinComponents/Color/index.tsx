import React, { ReactNode } from "react";

type Props = {
  code: string;
  children: ReactNode;
};

export const Color = ({ code, children }: Props) => <span style={{ color: code }}>{children}</span>;
