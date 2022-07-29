import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import styled from 'styled-components';

function Walk() {
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);
  return (
    <Wrapper>
      <Header colorByLevel={colorByLevel}></Header>
      <Content></Content>
    </Wrapper>
  );
}

export default Walk;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: calc(var(--vh, 1vh) * 100);
`;
const Header = styled.div<{ colorByLevel: string }>`
  width: 100%;
  height: 185px;
  background-color: ${({ colorByLevel }) => colorByLevel};

  &:after {
    width: ${calcRatio(530, 360)};
    margin: 0 auto;
    height: 153px;
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    border-radius: 50%;
    position: absolute;
    top: 165px;
    left: calc(-${calcRatio(530, 360)} / 2 + 50%);
    content: '';
  }
`;

const Content = styled.div`
  width: 100%;
`;
