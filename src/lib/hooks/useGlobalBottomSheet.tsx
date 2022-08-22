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

  const isOpen = sheetProps && true;
  const setOpenBottomSheet = ({
    sheetType,
    sheetContent,
    sheetProps,
    contentProps,
  }: IBottomSheet) => {
    dispatch(
      openBottomSheet({ sheetType, sheetContent, sheetProps, contentProps }),
    );
  };
  const setCloseBottomSheet = () => {
    dispatch(closeBottomSheet());
  };
  return { isOpen, setOpenBottomSheet, setCloseBottomSheet } as const;
};

export default useGlobalBottomSheet;
