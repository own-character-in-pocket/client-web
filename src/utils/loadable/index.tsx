import React, { FC, lazy, Suspense } from "react";
import { Loading } from "./Loading";
import { LoadingError } from "./LoadingError";

type LoadingErrorProps = {
  error: any;
};

type Props = {
  loading?: FC;
  loadingError?: FC<LoadingErrorProps>;
  load: () => Promise<FC>;
};

export function loadable({ loading: LoadingComponent = Loading, loadingError: LoadingErrorComponent = LoadingError, load }: Props) {
  const factory = async () => {
    try {
      const Load = await load();
      return { default: () => <Load /> };
    } catch (error) {
      return { default: () => <LoadingErrorComponent error={error} /> };
    }
  };
  const Lazy = lazy(factory);
  return () => (
    <Suspense fallback={<LoadingComponent />}>
      <Lazy />
    </Suspense>
  );
}
