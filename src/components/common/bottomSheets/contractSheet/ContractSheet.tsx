import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from 'styled-components';
import RangeInput from './RangeInput';
import SelectInterest from './SelectInterest';
import SelectMoney from './SelectMoney';
import Signature from './Signature';
import SheetButton from '@components/common/buttons/SheetButton';

interface ContractSheetProps {
  children: JSX.Element;
  open: boolean;
  onDismiss?: () => void;
  label: string;

  onClickNext: () => void;
  disabledNext: boolean;
  sheetRef?: React.RefObject<HTMLDivElement>;
}

export const CONTRACT_SHEET_CONTENTS = {
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
};

function ContractSheet({
  children,
  sheetRef,
  open,
  onDismiss,

  onClickNext,
  label,
  disabledNext = true,
}: ContractSheetProps) {
  document.documentElement.style.setProperty('--rsbs-backdrop-bg', `none`);
  document.documentElement.style.setProperty('--rsbs-content-opacity', `0`);
  return (
    /* 이 컴포넌트의 onDismiss는 바텀시트의 바깥 빈 공간을 터치했을때 닫는 기능에 쓰입니다. */
    <StyledBottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      blocking={false}
    >
      <div ref={sheetRef}>
        <SheetContainer>{children}</SheetContainer>
        <SheetButton
          onClickNext={onClickNext}
          disabledNext={disabledNext}
          label={label}
        />
      </div>
    </StyledBottomSheet>
  );
}

export default ContractSheet;

const StyledBottomSheet = styled(BottomSheet)`
  scrollbar-width: none;
  overflow: hidden;
  /* 라이브러리 css 억지 커스텀 */
  & > * {
    //바텀시트 상단 그림자 제거
    box-shadow: none !important;
  }
  & > div > * {
    // 이자율 선택하기에서 초기 선택할때 스크롤바 생기는 현상 잡기
    overflow: hidden;
  }

  div:first-child:before {
    width: 60px;
    height: 5px;
    border-radius: 3px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  }
`;

const SheetContainer = styled.div`
  margin: 0px 18px 24px 18px;
`;
