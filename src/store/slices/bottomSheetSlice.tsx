import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  COMMON_SHEET_CONTENTS,
  CONTRACT_SHEET_CONTENTS,
} from '@components/common/bottomSheets/GlobalBottomSheet';
import { RootState } from '../app/store';

export interface SheetContainerProps {
  open: boolean;
  sheetRef?: React.RefObject<HTMLDivElement>;

  // for contractSheet
  label?: string;
  onClickNext?: () => void;
  disabledNext?: boolean;
}

export type TSheetContent =
  | typeof COMMON_SHEET_CONTENTS.ApproveCheck
  | typeof COMMON_SHEET_CONTENTS.DeleteCheck
  | typeof COMMON_SHEET_CONTENTS.DongilFailed
  | typeof COMMON_SHEET_CONTENTS.GiveUpCheck
  | typeof COMMON_SHEET_CONTENTS.GiveUpExceeded
  | typeof COMMON_SHEET_CONTENTS.SelectProfile
  | typeof COMMON_SHEET_CONTENTS.SheetCompleted
  | typeof CONTRACT_SHEET_CONTENTS.RangeInput
  | typeof CONTRACT_SHEET_CONTENTS.SelectInterest
  | typeof CONTRACT_SHEET_CONTENTS.SelectMoney
  | typeof CONTRACT_SHEET_CONTENTS.Signature;

export interface IBottomSheet {
  sheetType: 'contract' | 'common';
  sheetContent: TSheetContent;
  sheetProps: SheetContainerProps;
  contentProps: any;
}
type TBottomSheetState = IBottomSheet | null;
const initialState = null as TBottomSheetState;

export const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState,
  reducers: {
    openBottomSheet: (state, action: PayloadAction<IBottomSheet>) => {
      return action.payload;
    },
    closeBottomSheet: (state) => {
      if (state) {
        state.sheetProps.open = false;
      }
    },
  },
});

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions;

export const selectBottomSheetState = (state: RootState) => state.bottomSheet;

export const selectBottomSheetProps = (state: RootState) =>
  state.bottomSheet?.sheetProps;

export const selectBottomSheetType = (state: RootState) =>
  state.bottomSheet?.sheetType;

export default bottomSheetSlice.reducer;
