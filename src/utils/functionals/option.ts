export class Option<T> {
  constructor(readonly variant: Some<T> | None) {}

  get isSome(): boolean {
    return this.variant.isSome;
  }

  get isNone(): boolean {
    return !this.isSome;
  }

  unwrap(): T {
    if (this.variant.isSome) {
      return this.variant.item;
    }
    throw new Error("None can not be unwrapped!");
  }

  unwrapOr(item: T): T {
    if (this.variant.isSome) {
      return this.variant.item;
    }
    return item;
  }

  unwrapOrElse(fn: () => T): T {
    if (this.variant.isSome) {
      return this.variant.item;
    }
    return fn();
  }
}

export class Some<T> {
  constructor(readonly item: T) {}

  readonly isSome = true;
}

export class None {
  readonly isSome = false;
}

export const some = <T>(item: T) => new Option<T>(new Some(item));

export const none = () => new Option<null>(new None());
