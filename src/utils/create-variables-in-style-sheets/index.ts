import kebabCase from "lodash.kebabcase";

export const createVariablesInStyleSheets = <R extends Record<string, number | string>>(variables: R): Record<keyof R, string> => {
  const record = {} as Record<keyof R, string>;

  const element = window.document.createElement("style");
  element.appendChild(window.document.createTextNode(":root {"));

  for (const [key, value] of Object.entries(variables)) {
    const variableKey = `--${kebabCase(key)}`;
    element.appendChild(window.document.createTextNode(`${variableKey}: ${value};`));
    record[key as keyof R] = `var(${variableKey})`;
  }

  element.appendChild(window.document.createTextNode("}"));
  document.head.append(element);

  return record;
};
