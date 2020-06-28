export class Result<T, E> {
  constructor(readonly variant: Ok<T> | Err<E>) {}

  get isOk(): boolean {
    return this.variant.isOk;
  }

  get isErr(): boolean {
    return !this.isOk;
  }

  get item(): T {
    if (this.variant.isOk) {
      return this.variant.item;
    }
    throw new Error("Err does not have a item");
  }

  get error(): E {
    if (!this.variant.isOk) {
      return this.variant.error;
    }
    throw new Error("Ok does not have a error");
  }

  unwrap(): T {
    if (this.variant.isOk) {
      return this.variant.item;
    }
    throw new Error("Err can not be unwrapped!");
  }

  unwrapOr(item: T): T {
    if (this.variant.isOk) {
      return this.variant.item;
    }
    return item;
  }

  unwrapOrElse(fn: () => T): T {
    if (this.variant.isOk) {
      return this.variant.item;
    }
    return fn();
  }
}

export class Ok<T> {
  constructor(readonly item: T) {}

  readonly isOk = true;
}

export class Err<E> {
  constructor(readonly error: E) {}

  readonly isOk = false;
}

export const ok = <T>(item: T): Result<T, null> => new Result(new Ok(item));

export const err = <E>(error: E): Result<any, E> => new Result(new Err(error));
