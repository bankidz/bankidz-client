import removeLocalStorage from '@lib/utils/localStorage/removeLocalStorage';
import { resetCredentials } from '@store/slices/authSlice';
import { useDispatch } from 'react-redux';

/**
 * @return API 호출 없이 오직 Client-side logout을 처리하는 함수를 반환합니다.
 */
function useLogoutClient() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetCredentials());
    localStorage.clear();
  };
  return logout;
}

export default useLogoutClient;
