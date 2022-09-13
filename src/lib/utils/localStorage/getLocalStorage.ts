import { TLocalStorageKey } from '../../types/TLocalStorageKey';

/**
 * @param key 필요 시 key를 TKey에 추가해주세요.
 * @return key에 해당하는 value가 없으면 null을 반환합니다.
 */
function getLocalStorage(key: TLocalStorageKey) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

export default getLocalStorage;
