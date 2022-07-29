import { TInterestRate } from '@lib/types/common';
import styled, { css } from 'styled-components';

interface InterestBadgeProps {
  /** 이자율을 입력합니다. */
  interestRate: TInterestRate;
}

function InterestBadge({ interestRate }: InterestBadgeProps) {
  const label = '이자부스터 ' + interestRate.toString() + '%';
  return (
    <Wrapper interestRate={interestRate}>
      <span>{label}</span>
    </Wrapper>
  );
}

export default InterestBadge;

const Wrapper = styled.div<{ interestRate: TInterestRate }>`
  ${({ interestRate, theme }) =>
    interestRate === 10 &&
    css`
      background-color: ${theme.palette.sementic.green300};
    `}
  ${({ interestRate, theme }) =>
    interestRate === 20 &&
    css`
      background-color: ${theme.palette.main.yellow300};
    `}
    ${({ interestRate, theme }) =>
    interestRate === 30 &&
    css`
      background-color: ${theme.palette.sementic.red300};
    `}

    & > span {
    ${({ theme }) => theme.typo.tag.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.white};
  }
  height: 26px;
  width: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.large};
`;
