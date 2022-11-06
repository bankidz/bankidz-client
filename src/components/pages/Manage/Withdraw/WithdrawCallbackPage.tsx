import { useEffect } from 'react';
import { useMutation } from 'react-query';
import userAPI from '@lib/apis/user/userAPI';
import useLogoutClient from '@lib/hooks/auth/useLogoutClient';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

function WithdrawCallbackPage() {
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const logoutClient = useLogoutClient();
  const appleWithdrawReason = getLocalStorage('appleWithdrawReason');

  const deleteMutation = useMutation(userAPI.deleteUser, {
    onSuccess: () => {
      setCloseBottomSheet();
      logoutClient();
    },
  });

  useEffect(() => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      contentProps: {
        type: 'withdrawed',
        onMainActionClick: async () => {
          deleteMutation.mutate({ message: appleWithdrawReason });
        },
      },
    });
  }, []);

  return <></>;
}

export default WithdrawCallbackPage;
