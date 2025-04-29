export const safeParseJSON = (key, defaultValue = []) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error parsing ${key}:`, error);
      return defaultValue;
    }
  };
  
  export const safeStringifyJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      return false;
    }
  };