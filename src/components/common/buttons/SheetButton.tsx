import styled, { css } from 'styled-components';

interface SheetButtonProps {
  onClickNext: () => void;
  disabledNext: boolean;
  label: string;
  outerSheet?: boolean;
}

/**
 * @param outerSheet 바텀시트 내에서 사용될때는 하단고정 하지 않음
 */
function SheetButton({
  onClickNext,
  disabledNext,
  label,
  outerSheet = false,
}: SheetButtonProps) {
  return (
    <Wrapper
      onClick={onClickNext}
      disabled={disabledNext}
      outerSheet={outerSheet}
    >
      {label}
    </Wrapper>
  );
}

export default SheetButton;

const Wrapper = styled.button<{ outerSheet: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.main.yellow300};
  &:disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    cursor: default;
  }
  ${({ theme }) => theme.typo.button.Primary_T_15_EB}
  color: white;
  ${({ outerSheet }) =>
    outerSheet &&
    css`
      position: fixed;
      bottom: 0px;
      left: 0px;
    `}
`;
