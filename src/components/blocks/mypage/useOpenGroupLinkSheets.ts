import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

const useOpenGroupLinkSheets = () => {
  const { setOpenBottomSheet, openSheetBySequence } = useGlobalBottomSheet();
  // '아직 가입이 안된 회원이에요' 바텀시트
  const openUnregisteredCheckSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      contentProps: {
        type: 'unregistered',
        onMainActionClick: handler,
      },
    });
  };

  // '링크가 만료되었어요' 바텀시트
  const openExpiredNoticeSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      contentProps: {
        type: 'expired',
        onMainActionClick: handler,
      },
    });
  };

  // '잘못된 그룹코드에요' 바텀시트
  const openInvalidNoticeSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      contentProps: {
        type: 'invalid',
        onMainActionClick: handler,
      },
    });
  };

  // '새로운 가족그룹으로 이동할까요?' 바텀시트
  const openMoveGroupCheckSheet = (handler: () => void) => {
    setOpenBottomSheet({
      sheetContent: 'Check',

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

      contentProps: {
        type: 'joinGroup',
        onMainActionClick: handler,
      },
    });
  };

  // '새로운 가족 그룹으로 이동했어요' 바텀시트
  const openMoveGroupCompletedSheet = (handler: () => void) => {
    const sheetOpen = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',

        contentProps: {
          type: 'moveGroup',
          onMainActionClick: handler,
        },
      });

    openSheetBySequence(sheetOpen);
  };

  return {
    openUnregisteredCheckSheet,
    openExpiredNoticeSheet,
    openInvalidNoticeSheet,
    openMoveGroupCheckSheet,
    openMoveGroupDoubleCheckSheet,
    openJoinGroupCheckSheet,
    openMoveGroupCompletedSheet,
  };
};

export default useOpenGroupLinkSheets;
