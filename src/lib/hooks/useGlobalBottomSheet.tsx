import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  closeBottomSheet,
  IBottomSheet,
  openBottomSheet,
  selectBottomSheetProps,
} from '@store/slices/bottomSheetSlice';

const useGlobalBottomSheet = () => {
  const sheetProps = useAppSelector(selectBottomSheetProps);
  const dispatch = useAppDispatch();

  // 바텀시트 열려있는 상태
  const isOpen = sheetProps && true;

  // 바텀시트 열기
  const setOpenBottomSheet = ({
    sheetContent,
    sheetProps,
    contentProps,
  }: IBottomSheet) => {
    dispatch(openBottomSheet({ sheetContent, sheetProps, contentProps }));
  };

  // 바텀시트 닫기
  const setCloseBottomSheet = () => {
    dispatch(closeBottomSheet());
  };
  // 바텀시트 내부 버튼의 액션으로 다음 바텀시트를 여는 경우
  const openSheetBySequence = (openSheetFunc: () => void) => {
    setCloseBottomSheet();
    setTimeout(openSheetFunc, 300);
  };
  return {
    isOpen,
    setOpenBottomSheet,
    setCloseBottomSheet,
    openSheetBySequence,
  } as const;
};

export default useGlobalBottomSheet;
