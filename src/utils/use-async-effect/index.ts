import { DependencyList, useEffect } from "react";

export type IsMounted = () => boolean;
export type OnCancel = () => void;
export type CancelHandler = (onCancel: OnCancel) => void;
export type OnCleanup = () => void;
export type EffectCallback = (isMounted: IsMounted, onCancel: CancelHandler) => Promise<void>;

const noop = (): void => {};

export function useAsyncEffect(effect: EffectCallback, dependencies: DependencyList): void;
export function useAsyncEffect(effect: EffectCallback, onCleanup: OnCleanup, dependencies: DependencyList): void;
export function useAsyncEffect(
  effect: EffectCallback,
  onCleanup: OnCleanup | DependencyList,
  dependencies = onCleanup as DependencyList
): void {
  const runGenerator = () => {
    let isMounted = true;
    let onCancel: OnCancel = noop;

    const checkToBeMounted: IsMounted = () => isMounted;
    const cancelHandler: CancelHandler = nextCancelHandler => {
      onCancel = nextCancelHandler;
    };
    effect(checkToBeMounted, cancelHandler);

    const cleanup: OnCleanup = () => {
      isMounted = false;
      onCancel();
      if (typeof onCleanup === "function") {
        onCleanup();
      }
    };

    return cleanup;
  };
  useEffect(runGenerator, dependencies);
}
