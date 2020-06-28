import React from "react";

export const Loading = () => <>Loading...</>;

type LoadingErrorProps = {
  error: any;
};

Loading.Error = (props: LoadingErrorProps) => <>Error on Loading!</>;
