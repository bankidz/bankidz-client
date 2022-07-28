import { useState, useEffect } from 'react';

function getLocalValue(key: string, initValue: any) {
  //SSR Next.js
  if (typeof window === 'undefined') return initValue;
  // if a value is already store
  // @ts-expect-error
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;
  // return result of a function
  if (initValue instanceof Function) return initValue();
  return initValue;
}

function useLocalStorage(key: string, initValue: any) {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default useLocalStorage;
