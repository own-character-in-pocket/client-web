import React, { Fragment, ReactNode, FC } from "react";
import { Document } from "./Document";
import * as BuildinComponents from "./BuildinComponents";
import { BlockTag, DocumentNode, InlineTag, Linebreak, Reference, Text, Variable, Whitespace } from "./DocumentNode";

type Args<T> = Record<string, T>;
type Locales = Record<string, Locale>;
type Locale = string;

export class Localization {
  static of(locales: Locales): Localization {
    return new Localization(locales);
  }

  private readonly localeSheet: Record<string, DocumentNode[]>;

  private constructor(locales: Locales) {
    this.localeSheet = Object.entries(locales).reduce((sheet, [key, value]) => {
      sheet[key] = Document.parse(value as string);
      return sheet;
    }, {} as Record<string, DocumentNode[]>);
  }

  has(key: string): boolean {
    return !!this.localeSheet[key];
  }

  message<T = any>(key: string, args: Args<T> = {}): null | string {
    if (this.has(key)) {
      return this.formatDocumentNodeArrayToMessage(this.parse(key), args, []);
    }
    return null;
  }

  private formatDocumentNodeArrayToMessage<T>(nodeList: DocumentNode[], args: Args<T>, referenceList: string[]): string {
    return nodeList.map(node => this.formatMessage(node, args, referenceList)).join("");
  }

  private formatMessage<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): string {
    return (
      this.formatBlockTagToMessage(node, args, referenceList) ||
      this.formatInlineTagToMessage(node, args, referenceList) ||
      this.formatReferenceToMessage(node, args, referenceList) ||
      this.formatToMessage(node, args)
    );
  }

  private formatBlockTagToMessage<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): void | string {
    if (node instanceof BlockTag) {
      return this.formatDocumentNodeArrayToMessage(node.children, args, referenceList);
    }
  }

  private formatInlineTagToMessage<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): void | string {
    if (node instanceof BlockTag) {
      return this.formatDocumentNodeArrayToMessage(node.children, args, referenceList);
    }
  }

  private formatReferenceToMessage<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): void | string {
    if (node instanceof Reference) {
      if (referenceList.includes(node.name)) {
        return `{ (circular-referenced) ${node.name} }`;
      }
      if (!this.has(node.name)) {
        return `{ ${node.name} }`;
      }
      return this.formatDocumentNodeArrayToMessage(this.parse(node.name), args, referenceList.concat(node.name));
    }
  }

  private formatToMessage<T>(node: DocumentNode, args: Args<T>): string {
    return this.format(node, args);
  }

  node<T = any>(key: string, args: Args<T> = {}): null | JSX.Element {
    if (this.has(key)) {
      return <>{this.formatDocumentNodeArrayToNode(this.parse(key), args, [])}</>;
    }
    return null;
  }

  private formatDocumentNodeArrayToNode<T>(nodeList: DocumentNode[], args: Args<T>, referenceList: string[]): JSX.Element[] {
    return nodeList.map((node, index) => <Fragment key={index}>{this.formatNode(node, args, referenceList)}</Fragment>);
  }

  private formatNode<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): ReactNode {
    return (
      this.formatBlockTagToNode(node, args, referenceList) ??
      this.formatInlineTagToNode(node) ??
      this.formatReferenceTagToNode(node, args, referenceList) ??
      this.formatToNode(node, args)
    );
  }

  private formatBlockTagToNode<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): ReactNode {
    if (node instanceof BlockTag) {
      const Component = (BuildinComponents[node.name as keyof typeof BuildinComponents] as FC) ?? node.name;
      return React.createElement(Component, node.attributes as any, this.formatDocumentNodeArrayToNode(node.children, args, referenceList));
    }
  }

  private formatInlineTagToNode(node: DocumentNode): ReactNode {
    if (node instanceof InlineTag) {
      const Component = (BuildinComponents[node.name as keyof typeof BuildinComponents] as FC) ?? node.name;
      return React.createElement(Component, node.attributes as any);
    }
  }

  private formatReferenceTagToNode<T>(node: DocumentNode, args: Args<T>, referenceList: string[]): ReactNode {
    if (node instanceof Reference) {
      if (referenceList.includes(node.name)) {
        return `{ (circular-referenced) ${node.name} }`;
      }
      if (!this.has(node.name)) {
        return `{ ${node.name} }`;
      }
      return this.formatDocumentNodeArrayToNode(this.parse(node.name), args, referenceList.concat(node.name));
    }
  }

  private formatToNode<T>(node: DocumentNode, args: Args<T>): string {
    return this.format(node, args);
  }

  private format<T>(node: DocumentNode, args: Args<T>): string {
    if (node instanceof Variable) {
      const argument = args[node.name];
      return argument ? String(argument) : `{ $${node.name} }`;
    }
    if (node instanceof Text) {
      return node.value;
    }
    if (node instanceof Linebreak) {
      return "\n".repeat(node.count);
    }
    if (node instanceof Whitespace) {
      return " ".repeat(node.count);
    }
    throw new Error("unreachable!");
  }

  private parse(key: string): DocumentNode[] {
    return this.localeSheet[key] ?? Document.parse(key);
  }
}
