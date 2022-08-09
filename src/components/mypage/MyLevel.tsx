import styled, { css } from 'styled-components';
import getContentsForMyLevel from '@lib/utils/kid/getContentsForMyLevel';
import { ReactComponent as Banki } from '@assets/illusts/banki/banki_walking.svg';

type TMyLevel = {
  achievedChallenge: number;
};

function MyLevel({ achievedChallenge }: TMyLevel) {
  const { previousIllust, nextIllust, goal, require } =
    getContentsForMyLevel(achievedChallenge)!;
  const bankiPosition =
    (100 / require) * (require - (goal - achievedChallenge));
  return (
    <Wrapper bankiPosition={bankiPosition}>
      <div>
        <div className="previous">{previousIllust}</div>
        <div className="next">{nextIllust}</div>
        <Track />
        <div className="banki">
          <Banki />
        </div>
      </div>
      <p>다음 레벨까지 완주해야할 돈길 {goal - achievedChallenge}개</p>
    </Wrapper>
  );
}

export default MyLevel;

const Wrapper = styled.div<{ bankiPosition: number }>`
  padding-top: 16px;
  & > div {
    width: 100%;
    position: relative;
    .previous {
      position: absolute;
      left: 0px;
      top: -8px;
    }
    .next {
      position: absolute;
      right: 0px;
      top: -16px;
    }
    .banki {
      position: absolute;
      top: -16px;
      ${({ bankiPosition }) => {
        return css`
          left: calc(${bankiPosition}% - (1.24 * ${bankiPosition}px) + 32px);
        `;
      }}
    }
  }

  & > p {
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-top: 16px;
    width: 100%;
    text-align: center;
  }
`;
const Track = styled.div`
  height: 16px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey200};
  margin-left: 16px;
  margin-right: 24px;
  box-sizing: border-box;
`;
