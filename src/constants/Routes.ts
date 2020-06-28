import { compile } from "path-to-regexp";

const createCompiler = <T extends Record<string, null | boolean | number | string>>(path: string) => {
  const compiler = compile(path);
  return (item: T) => compiler(item);
};

export const MAIN = "/";
export const CARD_LIST = "/card";
export const CARD_INFORMATION = "/card/:id";
export const cardInformationPath = createCompiler<{ id: string }>(CARD_INFORMATION);
