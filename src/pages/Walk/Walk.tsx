import WalkingItemNameButton from '@components/walk/WalkingItemNameButton';
import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectLevel } from '@store/slices/authSlice';
import {
  IMoneyRoad,
  selectWalkingMoneyRoads,
} from '@store/slices/walkingMoneyRoadsSlice';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Polygon } from '@assets/icons/walking-selector-polygon.svg';

function Walk() {
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const dDayLeft = 3;
  const [selected, setSelected] = useState<IMoneyRoad | null>(() =>
    walkingMoneyRoads ? walkingMoneyRoads[0] : null,
  );

  const onClickWalkingItemNameButton = (v: IMoneyRoad) => {
    setSelected(v);
  };

  return (
    <Wrapper>
      <Header colorByLevel={colorByLevel}>
        <Title dDayLeft={dDayLeft}>
          <p>돈길 걷기</p>
          <div>
            <p>이번주 리셋까지</p>
            <p>D-{dDayLeft}</p>
          </div>
        </Title>
        <MoneyRoadList>
          {walkingMoneyRoads?.map((v) => (
            <div onClick={() => onClickWalkingItemNameButton(v)}>
              <WalkingItemNameButton
                itemName={v.itemName}
                isSelected={selected?.id === v.id}
                isNoticed={false}
                key={v.id}
              />
              {selected?.id === v.id && <Polygon />}
            </div>
          ))}
        </MoneyRoadList>
      </Header>
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

const Title = styled.div<{ dDayLeft: number }>`
  padding-top: 16px;
  margin: 0px 16px;

  display: flex;
  justify-content: space-between;
  & > p {
    ${({ theme }) => theme.typo.fixed.TabName_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.white};
  }
  & > div {
    text-align: right;

    & > p:first-child {
      ${({ theme }) => theme.typo.text.S_12_M}
      color: ${({ theme }) => theme.palette.greyScale.white};
      padding-top: 2px;
    }
    & > p:last-child {
      ${({ theme }) => theme.typo.text.T_21_EB}
      margin-top: 8px;
      color: ${({ theme, dDayLeft }) =>
        dDayLeft <= 2
          ? theme.palette.sementic.red300
          : theme.palette.greyScale.white};
    }
  }
`;

const MoneyRoadList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 23px;

  height: 56px;
  gap: 8px;

  & > div {
    position: relative;
    & > svg {
      position: absolute;
      bottom: -40.5px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
    }
  }
`;

const Content = styled.div`
  width: 100%;
`;
