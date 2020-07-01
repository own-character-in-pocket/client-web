let index = 0;

export const hash = () => {
  const hash = code(Date.now() + index);
  index += 1;
  return hash;
};

const code = (index: number): string => (index < 26 ? String.fromCharCode(index + 97) : code(index / 26 - 1) + code(index % 26));
