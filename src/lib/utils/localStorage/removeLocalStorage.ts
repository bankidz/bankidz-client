import { TLocalStorageKey } from './TLocalStorageKey';

/**
 * @param key 필요 시 key를 TKey에 추가해주세요.
 */
function removeLocalStorage(key: TLocalStorageKey) {
  localStorage.removeItem(key);
}

export default removeLocalStorage;
