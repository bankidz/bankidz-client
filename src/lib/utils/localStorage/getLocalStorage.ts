import { TLocalStorageKey } from './TLocalStorageKey';

/**
 * @param key 필요 시 key를 TKey에 추가해주세요.
 */
function getLocalStorage(key: TLocalStorageKey) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export default getLocalStorage;
