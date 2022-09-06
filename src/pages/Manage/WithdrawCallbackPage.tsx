import CustomSyncLoader from '@components/common/CustomSyncLoader';
import useLogout from '@lib/hooks/auth/useLogout';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useEffect } from 'react';

function WithdrawCallbackPage() {
  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const logout = useLogout();
  // TODO: 탈퇴되었습니다. 바텀시트로 교체 부탁드립니다.
  function openWithdrawBottomSheet() {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'withdrawed',
        onMainActionClick: () => {
          setCloseBottomSheet();
          logout();
        },
      },
    });
  }

  useEffect(() => {
    openWithdrawBottomSheet();
  }, []);

  return <CustomSyncLoader />;
}

export default WithdrawCallbackPage;
