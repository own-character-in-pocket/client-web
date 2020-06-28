export const arrayToRecord = <K extends string>(...keyList: readonly K[]) =>
  keyList.reduce((dictionary, key) => {
    dictionary[key] = key;
    return dictionary;
  }, {} as Record<K, K>);
