const isBrowser = typeof window !== "undefined";

const saveToLocalStorage = (key: string, value: any) => {
  if (isBrowser) {
    // Ensure this runs only in the browser
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (isBrowser) {
    // Ensure this runs only in the browser
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  }
  return defaultValue;
};
