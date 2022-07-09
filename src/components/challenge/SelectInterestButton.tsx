import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import RiskBadge from '../badges/RiskBadge';

interface SelectInterestButtonProps {
  isSelected: boolean;
  risk: 1 | 2 | 3;
}

function SelectInterestButton({ isSelected, risk }: SelectInterestButtonProps) {
  const levelToString = useCallback((risk: number) => {
    switch (risk) {
      case 1:
        return '안정';
        break;
      case 2:
        return '중립';
        break;
      case 3:
        return '위험';
        break;
      default:
        return '안정';
    }
  }, []);

  return (
    <Wrapper isSelected={isSelected}>
      <RiskBadge riskLevel={levelToString(risk)} />
      <p>{risk}0%</p>
    </Wrapper>
  );
}

export default SelectInterestButton;

const Wrapper = styled.div<{ isSelected: boolean }>`
  height: 61px;
  width: 100%;
  border-radius: 8px;
  ${({ isSelected }) =>
    isSelected
      ? css`
          background-color: ${({ theme }) => theme.palette.yellow[1]};
          border: 1px solid ${({ theme }) => theme.palette.yellow[4]};
        `
      : css`
          border: 1px solid ${({ theme }) => theme.palette.yellow[1]};
        `}

  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'TmoneyRoundWind';
    font-size: 18px;
    line-height: auto;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.black};
  }
`;
