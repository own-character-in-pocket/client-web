abstract class AssertionError extends Error {}

export class AssertionErrorTruthy extends AssertionError {}
export class AssertionErrorFalsy extends AssertionError {}
export class AssertionErrorEquals extends AssertionError {}
export class AssertionErrorNotEquals extends AssertionError {}
export class AssertionErrorFail extends AssertionError {}
export class AssertionErrorUnreachable extends AssertionError {}
