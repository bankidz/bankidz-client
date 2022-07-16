import { HTMLAttributes, useCallback } from 'react';
import styled, { css } from 'styled-components';
import RiskBadge from '@components/common/badges/RiskBadge';

interface SelectInterestButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  risk: 10 | 20 | 30;
}

function SelectInterestButton({
  isSelected,
  risk,
  ...props
}: SelectInterestButtonProps) {
  const levelToString = useCallback((risk: number) => {
    switch (risk) {
      case 10:
        return '안정';
        break;
      case 20:
        return '보통';
        break;
      case 30:
        return '위험';
        break;
      default:
        return '안정';
    }
  }, []);

  return (
    <Wrapper isSelected={isSelected} {...props}>
      <RiskBadge riskLevel={levelToString(risk)} />
      <p>{risk}%</p>
    </Wrapper>
  );
}

export default SelectInterestButton;

const Wrapper = styled.button<{ isSelected: boolean }>`
  height: 75px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.medium};
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${({ theme }) => theme.palette.main.yellow100};
          border: 3px solid ${({ theme }) => theme.palette.main.yellow300};
        `
      : css`
          background-color: ${({ theme }) => theme.palette.greyScale.white};
          border: 3px solid ${({ theme }) => theme.palette.main.yellow100};
        `}

  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    ${({ theme }) => theme.typo.text.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
