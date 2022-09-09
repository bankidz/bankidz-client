import CustomSyncLoader from '@components/common/CustomSyncLoader';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useLogout from '@lib/hooks/auth/useLogout';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import removeLocalStorage from '@lib/utils/localStorage/removeLocalStorage';
import { useAppSelector } from '@store/app/hooks';
import { selectWithdrawReason } from '@store/slices/authSlice';
import { useEffect } from 'react';

function WithdrawCallbackPage() {
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const axiosPrivate = useAxiosPrivate();
  const withdrawReason = useAppSelector(selectWithdrawReason);

  useEffect(() => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'withdrawed',
        onMainActionClick: async () => {
          try {
            const response = await axiosPrivate.delete('/user', {
              data: { message: withdrawReason },
            });
            console.log(response);
            setCloseBottomSheet();
            removeLocalStorage('accessToken'); // logout
            removeLocalStorage('isKid');
            removeLocalStorage('provider');
          } catch (error: any) {
            console.log(error);
          }
        },
      },
    });
  }, []);

  return <CustomSyncLoader />;
}

export default WithdrawCallbackPage;
