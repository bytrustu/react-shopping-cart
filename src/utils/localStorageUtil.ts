type JSONValue = string | number | boolean | { [x: string]: JSONValue } | Array<JSONValue>;

const setItem = <T extends JSONValue>(key: string, value: T): void => {
  const jsonString = JSON.stringify(value);
  localStorage.setItem(key, jsonString);
};

const getItem = <T extends JSONValue>(key: string): T | null => {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    return JSON.parse(jsonString) as T;
  }
  return null;
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const clear = (): void => {
  localStorage.clear();
};

export const localStorageUtil = {
  setItem,
  getItem,
  removeItem,
  clear,
};
