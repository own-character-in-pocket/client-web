import { Loading } from "App/Atomics/Loading";
import React, { FC, lazy, Suspense } from "react";

type LoadingErrorProps = {
  error: any;
};

type Props = {
  loading?: FC;
  loadingError?: FC<LoadingErrorProps>;
  load: () => Promise<FC>;
};

export function lazyComponent({ loading: LoadingComponent = Loading, loadingError: LoadingError = Loading.Error, load }: Props) {
  const factory = async () => {
    try {
      const Load = await load();
      return { default: () => <Load /> };
    } catch (error) {
      return { default: () => <LoadingError error={error} /> };
    }
  };
  const Lazy = lazy(factory);
  return () => (
    <Suspense fallback={<LoadingComponent />}>
      <Lazy />
    </Suspense>
  );
}
