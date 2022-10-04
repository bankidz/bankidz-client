import userApi from '@lib/apis/user/userAPI';
import { useMutation } from 'react-query';
import useLogoutClient from './useLogoutClient';

/**
 * @return Server-side logout 처리 후 Client-side logout 또한 처리하는 함수를 반환합니다.
 */
function useLogoutServer() {
  const logoutClient = useLogoutClient();
  const logoutMutation = useMutation(userApi.patchUserLogout, {
    onSuccess: () => {
      logoutClient();
    },
  });

  const logoutServer = async () => {
    logoutMutation.mutate();
  };
  return logoutServer;
}

export default useLogoutServer;
