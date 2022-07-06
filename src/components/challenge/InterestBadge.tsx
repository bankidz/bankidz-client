import styled from 'styled-components';
import { ReactComponent as ChallengeBadgeBorder } from '../../assets/icons/challenge-badge-border.svg';
import { theme } from '../../lib/styles/theme';

interface InterestBadgeProps {
  /** 이자부스터 수치(number)를 입력합니다. */
  interestRate: number;
}

export function InterestBadge({ interestRate }: InterestBadgeProps) {
  const stringInterestRate = interestRate.toString() + '%';
  return (
    <ComponentWrapper>
      <ChallengeBadgeBorder />
      <TextWrapper>
        <span className="value">{stringInterestRate}</span>
        <span className="label">이자부스터</span>
      </TextWrapper>
    </ComponentWrapper>
  );
}

export default InterestBadge;

const ComponentWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 130px;
  max-width: 200px;
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  .value {
    height: 26px;
    width: 100%;
    font-style: normal;
    font-weight: 800;
    font-size: 20px;
    line-height: 26px;
    color: ${({ theme }) => theme.palette.yellow[4]};
  }

  .label {
    height: 16px;
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  span + span {
    margin-top: 2px;
  }
`;
