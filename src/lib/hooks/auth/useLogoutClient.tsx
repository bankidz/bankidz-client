import { useDispatch } from 'react-redux';
import { resetCredentials } from '@store/slices/authSlice';

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
