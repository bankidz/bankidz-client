import CustomSyncLoader from '@components/common/CustomSyncLoader';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useLogoutClient from '@lib/hooks/auth/useLogoutClient';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useAppSelector } from '@store/app/hooks';
import { selectWithdrawReason } from '@store/slices/authSlice';
import { useEffect } from 'react';

function WithdrawCallbackPage() {
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const axiosPrivate = useAxiosPrivate();
  const withdrawReason = useAppSelector(selectWithdrawReason);
  const logout = useLogoutClient();

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
            console.log('withdrawReason: ', withdrawReason);
            const response = await axiosPrivate.delete('/user', {
              data: { message: '애플은 탈퇴사유 출시 이후에 구현할게용 ㅠㅠ' },
            });
            console.log(response);
            setCloseBottomSheet();
            logout();
          } catch (error: any) {
            console.log(error);
          }
        },
      },
    });
  }, []);

  return <></>;
}

export default WithdrawCallbackPage;
