import styled from 'styled-components';
import { ReactComponent as ChallengeBadgeBorder } from '../../assets/icons/challenge-badge-border.svg';
import { theme } from '../../lib/styles/theme';

interface ChallengeBadgeProps {
  /** 목표저금액(number)을 입력합니다. */
  targetSaving: number;
  /** 이자부스터 수치(number)를 입력합니다. */
  interestRate: number;
}

export function ChallengeBadge({
  targetSaving,
  interestRate,
}: ChallengeBadgeProps) {
  const stringTargetSaving = targetSaving.toString()

  return (
    <ComponentWrapper>
      <StyledSpan>
        <div className="border-wrapper">
          <ChallengeBadgeBorder />
        </div>
        <span></span>
        <span>목표저금액</span>
      </StyledSpan>
      <StyledSpan>
        <div className="border-wrapper">
          <ChallengeBadgeBorder />
        </div>
        <span></span>
        <span>목표저금액</span>
      </StyledSpan>
    </ComponentWrapper>
  );
}

export default ChallengeBadge;

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledSpan = styled.button`
  position: relative;
  width: 152px;
  height: 160px;

  border: none;
  outline: none;
  border-radius: 28px;
  background-color: white;

  .border-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 5;
  }

  .character-wrapper {
    position: absolute;
    left: 50%;
    top: 24px;
    transform: translate3d(-50%, 0, 0);
    z-index: 10;
  }

  span {
    position: absolute;
    width: 24px;
    height: 12px;
    left: 50%;
    top: 125px;

    font-style: normal;
    font-weight: 800;
    font-size: 12px;
    line-height: 100%;
    text-align: center;

    transform: translate3d(-50%, -50%, 0);
    z-index: 10;
  }
`;

// https://velog.io/@apro_xo/CSS-top-left-translate%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B0%80%EC%9A%B4%EB%8D%B0-%EC%A0%95%EB%A0%AC
