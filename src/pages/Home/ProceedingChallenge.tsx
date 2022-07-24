import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/home/getColorByLevel';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

type ProceedingChallengeProps = {
  level: 1 | 2 | 3 | 4 | 5 | null;
};

function ProceedingChallenge({ level }: ProceedingChallengeProps) {
  const { challengeId } = useParams();
  const colorByLevel = getColorByLevel(level);
  return (
    <>
      <Header colorByLevel={colorByLevel}></Header>
      <Content></Content>
    </>
  );
}

export default ProceedingChallenge;

const Header = styled.div<{ colorByLevel: string }>`
  position: relative;
  height: 337px;
  background-color: ${({ colorByLevel }) => colorByLevel};
  width: 100%;
  margin-top: -17px;
  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 230px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 305px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  min-height: 1000px;
`;
