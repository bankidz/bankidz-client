import styled from 'styled-components';
import { ReactComponent as ChallengeBadgeBorder } from '../../assets/icons/challenge-badge-border.svg';

interface ChallengeBadgeProps {
  /** 목표저금액(number)을 입력합니다. */
  targetSaving: number;
}

export function TargetBadge({ targetSaving }: ChallengeBadgeProps) {
  const stringTargetSaving = targetSaving.toLocaleString('ko-KR') + '원';
  return (
    <Wrapper>
      <ChallengeBadgeBorder />
      <TextWrapper>
        <span className="value">{stringTargetSaving}</span>
        <span className="label">목표저금액</span>
      </TextWrapper>
    </Wrapper>
  );
}

export default TargetBadge;

const Wrapper = styled.div`
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
