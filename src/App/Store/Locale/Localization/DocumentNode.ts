export type DocumentNode = BlockTag | InlineTag | Reference | Variable | Text | Linebreak | Whitespace;

type Attributes = Record<string, null | boolean | number | string>;

export class BlockTag {
  constructor(readonly name: string, readonly attributes: Attributes, readonly children: DocumentNode[]) {}
}

export class InlineTag {
  constructor(readonly name: string, readonly attributes: Attributes) {}
}

export class Reference {
  constructor(readonly name: string) {}
}

export class Variable {
  constructor(readonly name: string) {}
}

export class Text {
  constructor(readonly value: string) {}
}

export class Linebreak {
  constructor(readonly count: number) {}
}

export class Whitespace {
  constructor(readonly count: number) {}
}
