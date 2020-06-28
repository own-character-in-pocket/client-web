import {
  AssertionErrorEquals,
  AssertionErrorFail,
  AssertionErrorFalsy,
  AssertionErrorNotEquals,
  AssertionErrorTruthy,
  AssertionErrorUnreachable
} from "./AssertionError";

const DEFAULT_MESSAGE = "Unexpected Conditions";

export const Assertion = {
  truthy(source: boolean | string, message = DEFAULT_MESSAGE) {
    switch (typeof source) {
      case "boolean": {
        if (!source) {
          throw new AssertionErrorTruthy(message);
        }
        return;
      }
      case "string": {
        if (!source.length) {
          throw new AssertionErrorFalsy(message);
        }
        return;
      }
    }
  },
  falsy(source: boolean | string, message = DEFAULT_MESSAGE) {
    switch (typeof source) {
      case "boolean": {
        if (source) {
          throw new AssertionErrorTruthy(message);
        }
        return;
      }
      case "string": {
        if (source.length) {
          throw new AssertionErrorFalsy(message);
        }
        return;
      }
    }
  },
  equals<T>(source: T, expected: T, message: string = DEFAULT_MESSAGE) {
    if (source !== expected) {
      throw new AssertionErrorEquals(message);
    }
  },
  notEquals<T>(source: T, expected: T, message: string = DEFAULT_MESSAGE) {
    if (source === expected) {
      throw new AssertionErrorNotEquals(message);
    }
  },
  fail(message: string = DEFAULT_MESSAGE) {
    throw new AssertionErrorFail(message);
  },
  unreachable(message: string = DEFAULT_MESSAGE) {
    throw new AssertionErrorUnreachable(message);
  }
};
