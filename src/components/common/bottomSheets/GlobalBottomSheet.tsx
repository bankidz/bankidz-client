import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useAppSelector } from '@store/app/hooks';
import { selectBottomSheetState } from '@store/slices/bottomSheetSlice';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from 'styled-components';
import ApproveCheck from './commonSheet/ApproveCheck';
import DeleteCheck from './commonSheet/DeleteCheck';
import DongilFailed from './commonSheet/DongilFailed';
import GiveUpCheck from './commonSheet/GiveUpCheck';
import GiveUpExceeded from './commonSheet/GiveUpExceeded';
import SelectProfile from './commonSheet/SelectProfile';
import SheetCompleted from './commonSheet/SheetCompleted';

/* export const CONTRACT_SHEET_CONTENTS = {
  RangeInput: 'RangeInput',
  SelectInterest: 'SelectInterest',
  SelectMoney: 'SelectMoney',
  Signature: 'Signature',
} as const;

const ContractSheetContent: any = {
  [CONTRACT_SHEET_CONTENTS.RangeInput]: RangeInput,
  [CONTRACT_SHEET_CONTENTS.SelectInterest]: SelectInterest,
  [CONTRACT_SHEET_CONTENTS.SelectMoney]: SelectMoney,
  [CONTRACT_SHEET_CONTENTS.Signature]: Signature,
}; */

export const COMMON_SHEET_CONTENTS = {
  ApproveCheck: 'ApproveCheck',
  DeleteCheck: 'DeleteCheck',
  DongilFailed: 'DongilFailed',
  GiveUpCheck: 'GiveUpCheck',
  GiveUpExceeded: 'GiveUpExceeded',
  SelectProfile: 'SelectProfile',
  SheetCompleted: 'SheetCompleted',
} as const;

const CommonSheetContent: any = {
  [COMMON_SHEET_CONTENTS.ApproveCheck]: ApproveCheck,
  [COMMON_SHEET_CONTENTS.DeleteCheck]: DeleteCheck,
  [COMMON_SHEET_CONTENTS.DongilFailed]: DongilFailed,
  [COMMON_SHEET_CONTENTS.GiveUpCheck]: GiveUpCheck,
  [COMMON_SHEET_CONTENTS.GiveUpExceeded]: GiveUpExceeded,
  [COMMON_SHEET_CONTENTS.SelectProfile]: SelectProfile,
  [COMMON_SHEET_CONTENTS.SheetCompleted]: SheetCompleted,
};

function GlobalBottomSheet() {
  const bottomSheetState = useAppSelector(selectBottomSheetState);
  const { sheetContent, sheetProps, contentProps } = bottomSheetState || {};
  const { setCloseBottomSheet } = useGlobalBottomSheet();

  document.documentElement.style.setProperty(
    '--rsbs-backdrop-bg',
    `rgba(0,0,0,0.7)`,
  );

  const renderComponent = () => {
    if (!bottomSheetState) {
      return null;
    } else {
      const SheetContentComponent = CommonSheetContent[sheetContent!];

      return (
        <StyledBottomSheet
          open={sheetProps!.open}
          onDismiss={setCloseBottomSheet}
          snapPoints={({ minHeight }) => minHeight}
        >
          <div ref={sheetProps!.sheetRef}>
            <SheetContent>
              <SheetContentComponent {...contentProps} />
            </SheetContent>
          </div>
        </StyledBottomSheet>
      );
    }
  };

  return <>{renderComponent()}</>;
}

export default GlobalBottomSheet;

const StyledBottomSheet = styled(BottomSheet)`
  /* 라이브러리 css 억지 커스텀 */
  div:first-child:before {
    width: 60px;
    height: 5px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  }
`;

const SheetContent = styled.div`
  margin: 0px 18px 14px 18px;
`;
