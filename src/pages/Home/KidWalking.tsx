import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function KidWalking() {
  const { challengeId } = useParams();
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);
  return (
    <>
      <Header colorByLevel={colorByLevel}></Header>
      <Content>걷고있는 돈길 상세</Content>
    </>
  );
}

export default KidWalking;

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
