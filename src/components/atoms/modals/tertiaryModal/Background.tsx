import styled from 'styled-components';

interface BackgroundProps {
  currentCardIdx: number;
}

function Background({ currentCardIdx }: BackgroundProps) {
  return (
    <Wrapper>
      <div className="yellow-box"></div>
      <div className="white-box">
        <ProgressCircle currentCardIdx={currentCardIdx}>
          <div className="first" />
          <div className="second" />
          <div className="third" />
        </ProgressCircle>
      </div>
    </Wrapper>
  );
}

export default Background;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 504px;

  .yellow-box {
    height: 230px;
    width: 100%;

    position: absolute;
    left: 50%;
    top: 117px; // overlaps 2px
    transform: translate3d(-50%, -50%, 0);

    background: ${({ theme }) => theme.palette.main.yellow100};
    border-top-left-radius: ${({ theme }) => theme.radius.large};
    border-top-right-radius: ${({ theme }) => theme.radius.large};
  }
  .white-box {
    height: 274px;
    width: 100%;

    display: flex;
    justify-content: center;

    position: absolute;
    left: 50%;
    top: 367px; // 230 + 274 / 2
    transform: translate3d(-50%, -50%, 0);

    background: ${({ theme }) => theme.palette.greyScale.white};
    border-bottom-left-radius: ${({ theme }) => theme.radius.large};
    border-bottom-right-radius: ${({ theme }) => theme.radius.large};
  }
`;

const ProgressCircle = styled.div<{ currentCardIdx: number }>`
  margin-top: 246px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 52px;
  height: 12px;

  div {
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }
  .first {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 0
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
  .second {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 1
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
  .third {
    background: ${({ currentCardIdx, theme }) =>
      currentCardIdx === 2
        ? theme.palette.main.yellow300
        : theme.palette.greyScale.grey200};
  }
`;
