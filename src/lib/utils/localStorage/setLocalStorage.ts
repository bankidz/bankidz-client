import { TLocalStorageKey } from './TLocalStorageKey';

/**
 * @param key 필요 시 key를 TKey에 추가해주세요.
 */
function setLocalStorage(key: TLocalStorageKey, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default setLocalStorage;
