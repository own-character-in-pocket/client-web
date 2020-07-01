import { compile, MatchResult, match } from "path-to-regexp";

const createCompiler = <P extends Record<string, null | boolean | number | string>>(path: string) => {
  const compiler = compile(path);
  const matcher = match<P>(path);
  return {
    transform(item: P): string {
      return compiler(item);
    },
    parse(path: string): MatchResult<P> {
      return matcher(path) as MatchResult<P>;
    },
    isMatch(path: string): boolean {
      return !!matcher(path);
    }
  };
};

export const MAIN = "/";
export const CARD_LIST = "/card";
export const CARD_INFORMATION = "/card/:id";
export const cardInformationPath = createCompiler<{ id: string }>(CARD_INFORMATION);
