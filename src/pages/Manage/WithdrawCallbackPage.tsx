import CustomSyncLoader from '@components/common/CustomSyncLoader';
import useLogout from '@lib/hooks/auth/useLogout';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useEffect } from 'react';

function WithdrawCallbackPage() {
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const logout = useLogout();

  useEffect(() => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'withdrawed',
        onMainActionClick: async () => {
          await logout();
          setCloseBottomSheet();
        },
      },
    });
  }, []);

  return <CustomSyncLoader />;
}

export default WithdrawCallbackPage;
