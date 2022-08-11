import styled from 'styled-components';
import { TInterestRate } from '@lib/types/IInterestRate';
import { theme } from '@lib/styles/theme';

interface InterestBadgeProps {
  interestRate: TInterestRate;
}

function InterestBadge({ interestRate }: InterestBadgeProps) {
  const label = '이자부스터 ' + interestRate.toString() + '%';
  const colorByInterestRate = getColorByInterestRate(interestRate);
  function getColorByInterestRate(interestRate: TInterestRate) {
    if (interestRate === 10) {
      return theme.palette.sementic.green300;
    } else if (interestRate === 20) {
      return theme.palette.main.yellow300;
    } else if (interestRate === 30) {
      return theme.palette.sementic.red300;
    }
  }

  return (
    <Wrapper colorByInterestRate={colorByInterestRate!}>
      <span>{label}</span>
    </Wrapper>
  );
}

export default InterestBadge;

const Wrapper = styled.div<{ colorByInterestRate: string }>`
  background: ${({ colorByInterestRate }) => colorByInterestRate};
  > span {
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
