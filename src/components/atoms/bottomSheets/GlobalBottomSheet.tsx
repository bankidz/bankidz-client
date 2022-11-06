import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from 'styled-components';
import Check from './commonSheet/Check';
import DongilFailed from './commonSheet/DongilFailed';
import GiveUpCheck from './commonSheet/GiveUpCheck';
import Notice from './commonSheet/Notice';
import SelectProfile from './commonSheet/SelectProfile';
import Completed from './commonSheet/Completed';
import Warning from './commonSheet/Warning';
import { selectBottomSheetState } from '@store/slices/bottomSheetSlice';
import { useAppSelector } from '@store/app/hooks';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';

export const COMMON_SHEET_CONTENTS = {
  Check: 'Check',
  DongilFailed: 'DongilFailed',
  GiveUpCheck: 'GiveUpCheck',
  Notice: 'Notice',
  SelectProfile: 'SelectProfile',
  Completed: 'Completed',
  Warning: 'Warning',
} as const;

const CommonSheetContent: any = {
  [COMMON_SHEET_CONTENTS.Check]: Check,
  [COMMON_SHEET_CONTENTS.DongilFailed]: DongilFailed,
  [COMMON_SHEET_CONTENTS.GiveUpCheck]: GiveUpCheck,
  [COMMON_SHEET_CONTENTS.Notice]: Notice,
  [COMMON_SHEET_CONTENTS.SelectProfile]: SelectProfile,
  [COMMON_SHEET_CONTENTS.Completed]: Completed,
  [COMMON_SHEET_CONTENTS.Warning]: Warning,
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
