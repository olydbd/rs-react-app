import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, initialValue = '') {
  const [storedValue, setStoredValue] = useState(
    () => localStorage.getItem(key) ?? initialValue,
  );

  useEffect(() => {
    localStorage.setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
