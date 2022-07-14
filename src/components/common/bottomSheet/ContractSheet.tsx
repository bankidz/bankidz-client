import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from 'styled-components';

interface ContractSheetProps {
  children: JSX.Element;
  open: boolean;
  onDismiss: () => void;
  label: string;
  onClickNext: () => void;
  disabledNext: boolean;
  blocking?: boolean;
  sheetRef?: React.RefObject<HTMLDivElement>;
}

function ContractSheet({
  children,
  open,
  onDismiss,
  onClickNext,
  label,
  disabledNext = true,
  blocking = false,
  sheetRef,
}: ContractSheetProps) {
  document.documentElement.style.setProperty('--rsbs-backdrop-bg', `none`);
  document.documentElement.style.setProperty('--rsbs-content-opacity', `0`);
  return (
    /* 이 컴포넌트의 onDismiss는 바텀시트의 바깥 빈 공간을 터치했을때 닫는 기능에 쓰입니다. */
    <StyledBottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
      blocking={blocking}
    >
      <div ref={sheetRef}>
        <SheetContainer>{children}</SheetContainer>
        <NextButton onClick={onClickNext} disabled={disabledNext}>
          {label}
        </NextButton>
      </div>
    </StyledBottomSheet>
  );
}

export default ContractSheet;

const StyledBottomSheet = styled(BottomSheet)`
  /* 라이브러리 css 억지 커스텀 */
  & > * {
    box-shadow: none !important;
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

const NextButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.main.yellow300};
  &:disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    cursor: default;
  }
  ${({ theme }) => theme.typo.button.Primary_T_15_EB}
  color: white;
`;
