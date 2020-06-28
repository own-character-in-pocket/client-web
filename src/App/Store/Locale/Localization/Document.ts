import { Assertion } from "./Assertion";
import { BlockTag, DocumentNode, InlineTag, Linebreak, Reference, Text, Variable, Whitespace } from "./DocumentNode";
import { isAlphabet } from "./isAlphabet";
import { isNumeric } from "./isNumeric";
import { ParserStream } from "./ParserStream";

export class Document {
  static parse(source: string): DocumentNode[] {
    try {
      return new Document(new ParserStream(source)).parse();
    } catch {
      return [new Text(source)];
    }
  }

  private constructor(readonly stream: ParserStream) {}

  private parse(): DocumentNode[] {
    const nodeList: DocumentNode[] = [];
    while (true) {
      const linebreakCount = this.stream.consumeLinebreak();
      if (linebreakCount) {
        nodeList.push(new Linebreak(linebreakCount));
        continue;
      }

      if (this.stream.isEof) {
        break;
      }

      nodeList.push(...this.parseChildren());
    }

    return nodeList;
  }

  private parseChildren(): DocumentNode[] {
    const nodeList: DocumentNode[] = [];
    while (true) {
      if (this.stream.startsWith("</")) {
        break;
      }

      const node = this.parseChild();
      if (!node) {
        break;
      }

      nodeList.push(node);
    }

    return nodeList;
  }

  private parseChild(): null | DocumentNode {
    if (this.stream.isEol || this.stream.isEof) {
      return null;
    }

    const whitespaceCount = this.stream.consumeWhitespace();
    return whitespaceCount ? new Whitespace(whitespaceCount) : this.parseCurly() ?? this.parseTag() ?? this.parseText();
  }

  private parseCurly(): null | Variable | Reference {
    if (!this.stream.startsWith("{")) {
      return null;
    }

    this.stream.consumeChar();
    this.stream.consumeWhitespace();
    const isVariable = this.stream.startsWith("$");
    if (isVariable) {
      this.stream.consumeChar();
    }

    const name = this.parseName();
    this.stream.consumeWhitespace();
    Assertion.equals(this.stream.consumeChar(), "}");
    return isVariable ? new Variable(name) : new Reference(name);
  }

  private parseTag(): null | DocumentNode {
    if (!this.stream.startsWith("<")) {
      return null;
    }

    this.stream.consumeChar();
    const name = this.parseName();
    const attributes = this.parseAttributes();
    if (this.stream.startsWith("/>")) {
      this.stream.consumeCount(2);
      return new InlineTag(name, attributes);
    }

    Assertion.equals(this.stream.consumeChar(), ">");
    const children = this.parseChildren();
    Assertion.equals(this.stream.consumeChar(), "<");
    Assertion.equals(this.stream.consumeChar(), "/");
    Assertion.truthy(this.stream.startsWith(name));
    this.stream.consumeCount(name.length);
    Assertion.equals(this.stream.consumeChar(), ">");
    return new BlockTag(name, attributes, children);
  }

  private parseName(): string {
    let isHyphened = false;
    const name = this.stream.consumeBy((char, index) => {
      if (index === 0) {
        if (!isAlphabet(char)) {
          Assertion.unreachable();
        }
        return true;
      }

      if (char === "-") {
        Assertion.falsy(isHyphened);
        isHyphened = true;
        return true;
      }

      isHyphened = false;
      return isAlphabet(char) || isNumeric(char) || char === "-";
    });
    Assertion.truthy(name);
    Assertion.truthy(name[name.length - 1] !== "-");
    return name;
  }

  private parseAttributes(): Record<string, null | boolean | number | string> {
    const attributes: Record<string, null | boolean | number | string> = {};
    if (this.stream.isEol || this.stream.startsWith("/") || this.stream.startsWith(">")) {
      return attributes;
    }

    this.stream.consumeChar();
    while (true) {
      this.stream.consumeWhitespace();
      if (this.stream.startsWith("/") || this.stream.startsWith(">")) {
        break;
      }

      this.stream.consumeWhitespace();
      const attribute = this.parseAttribute();
      if (!attribute) {
        break;
      }

      const [name, value] = attribute;
      attributes[name] = value;
    }

    return attributes;
  }

  private parseAttribute(): null | [string, null | boolean | number | string] {
    if (this.stream.startsWith("/") || this.stream.startsWith(">")) {
      return null;
    }

    const name = this.parseName();
    if (!this.stream.startsWith("=")) {
      return [name, null];
    }

    this.stream.consumeChar();
    const value = this.parseAttributeValue();
    if (value) {
      return [name, value];
    }

    Assertion.unreachable();
    return null;
  }

  private parseAttributeValue(): null | null | boolean | number | string {
    return this.stream.consumeValue();
  }

  private parseText(): DocumentNode {
    return new Text(this.stream.consumeBy(char => !["{", "<", "\n"].includes(char)));
  }
}
