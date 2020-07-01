import { DependencyList, useEffect } from "react";

export type IsMounted = () => boolean;
export type OnCancel = () => void | Promise<void>;
export type CancelHandler = (onCancel: OnCancel) => void;
export type Effect = (isMounted: IsMounted, onCancel: CancelHandler) => Promise<void>;
export type Cleanup = () => void | Promise<void>;

const noop = (): void => {};

export function useAsyncEffect(effect: Effect, dependencies: DependencyList): void;
export function useAsyncEffect(effect: Effect, cleanup: Cleanup, dependencies: DependencyList): void;
export function useAsyncEffect(effect: Effect, cleanup: Cleanup | DependencyList, dependencies = cleanup as DependencyList): void {
  const run = () => {
    let isMounted = true;
    let onCancel: OnCancel = noop;

    const checkToBeMounted: IsMounted = () => isMounted;
    const cancelHandler: CancelHandler = nextCancelHandler => {
      onCancel = () => {
        onCancel = noop;
        return nextCancelHandler();
      };
    };
    effect(checkToBeMounted, cancelHandler).catch(() => onCancel());

    const cleanup = () => {
      isMounted = false;
      Promise.resolve(onCancel()).finally(() => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };

    return cleanup;
  };
  useEffect(run, dependencies);
}
