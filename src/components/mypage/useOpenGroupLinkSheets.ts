import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

const useOpenGroupLinkSheets = () => {
  const { setOpenBottomSheet, openSheetBySequence } = useGlobalBottomSheet();
  // '아직 가입이 안된 회원이에요' 바텀시트
  const openUnregisteredCheckSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'unregistered',
        onMainActionClick: handler,
      },
    });
  };

  // '링크가 만료되었어요' 바텀시트
  const openExpiredNoticeSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      sheetProps: { open: true },
      contentProps: {
        type: 'expired',
      },
    });
  };

  // '새로운 가족그룹으로 이동할까요?' 바텀시트
  const openMoveGroupCheckSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'moveGroup',
        onMainActionClick: () => {
          openMoveGroupDoubleCheckSheet(handler);
        },
      },
    });
  };

  // '정말 새로운 가족그룹으로 이동할까요?' 바텀시트
  const openMoveGroupDoubleCheckSheet = (handler: () => void) => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Check',
        sheetProps: { open: true },
        contentProps: {
          type: 'moveGroupCheck',
          onMainActionClick: handler,
        },
      });
    openSheetBySequence(openSheet);
  };

  // '해당 가족 그룹에 참여할래요?' 바텀시트
  const openJoinGroupCheckSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'joinGroup',
        onMainActionClick: handler,
      },
    });
  };

  return {
    openUnregisteredCheckSheet,
    openExpiredNoticeSheet,
    openMoveGroupCheckSheet,
    openMoveGroupDoubleCheckSheet,
    openJoinGroupCheckSheet,
  };
};

export default useOpenGroupLinkSheets;
