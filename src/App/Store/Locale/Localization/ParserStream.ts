import { Assertion } from "./Assertion";
import { isNumeric } from "./isNumeric";

export class ParserStream {
  private index = 0;

  constructor(readonly source: string) {}

  get currentCharacter(): null | string {
    if (this.source.length <= this.index) {
      return null;
    }
    return this.source[this.index];
  }

  get isEof(): boolean {
    return this.source.length === this.index;
  }

  get isEol(): boolean {
    return this.currentCharacter === "\n";
  }

  startsBy(test: (source: string) => boolean): boolean {
    if (this.source.length <= this.index) {
      return false;
    }
    return test(this.source.slice(this.index));
  }

  startsWith(target: string): boolean {
    return this.startsBy(source => source.startsWith(target));
  }

  consumeBy(isConsumeable: (char: string, index: number) => boolean): string {
    let value = "";
    let index = 0;
    while (true) {
      if (this.isEof) {
        break;
      }

      const currentCharacter = this.currentCharacter;
      if (!currentCharacter) {
        break;
      }

      if (!isConsumeable(currentCharacter, index)) {
        break;
      }

      value += currentCharacter;
      index += 1;
      this.index += 1;
    }

    return value;
  }

  consumeCount(count: number) {
    this.index += count;
  }

  consumeChar(): null | string {
    const currentCharacter = this.currentCharacter;
    if (!currentCharacter) {
      return null;
    }

    this.index += 1;
    return currentCharacter;
  }

  consumeWhitespace(): number {
    return this.consumeBy(char => char === " ").length;
  }

  consumeLinebreak(): number {
    return this.consumeBy(char => char === "\n").length;
  }

  consumeValue(): null | string | number | boolean {
    return this.consumeString() ?? this.consumeInteger() ?? this.consumeBoolean() ?? this.consumeNull();
  }

  private consumeString(): null | string {
    if (!this.startsWith('"') && !this.startsWith("'")) {
      return null;
    }

    const quote = this.consumeChar();
    const value = this.consumeBy(char => char !== quote);
    Assertion.equals(this.consumeChar(), quote);
    return value;
  }

  private consumeInteger(): null | number {
    if (!this.startsBy(isNumeric)) {
      return null;
    }

    return +this.consumeBy(isNumeric);
  }

  private consumeBoolean(): null | boolean {
    if (this.startsWith("false")) {
      this.consumeCount(5);
      return false;
    } else if (this.startsWith("true")) {
      this.consumeCount(4);
      return true;
    } else {
      return null;
    }
  }

  private consumeNull(): null {
    if (!this.startsWith("null")) {
      return null;
    }

    this.consumeCount(4);
    return null;
  }
}
