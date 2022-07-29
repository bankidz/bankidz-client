import moment from 'moment';
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
import renderItemIllustWalk from '@lib/utils/kid/renderItemIllustWalk';
import InterestBadge from '@components/common/badges/InterestBadge';

function Walk() {
  const level = useAppSelector(selectLevel);
  const colorByLevel = getColorByLevel(level!);
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const dDayLeft = 7 - moment().day();
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
            <div onClick={() => onClickWalkingItemNameButton(v)} key={v.id}>
              <WalkingItemNameButton
                itemName={v.itemName}
                isSelected={selected?.id === v.id}
                isNoticed={
                  v.progressList !== null
                    ? v.progressList[v.progressList.length]?.isAchieved
                    : false
                }
              />
              {selected?.id === v.id && <Polygon />}
            </div>
          ))}
        </MoneyRoadList>
      </Header>
      <Content>
        {selected && (
          <>
            {renderItemIllustWalk(selected.itemName)}
            <InterestBadge interestRate={selected.interestRate} />
            <p>{selected.title}</p>
          </>
        )}
      </Content>
    </Wrapper>
  );
}

export default Walk;

const Wrapper = styled.div`
  position: relative;
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
      ${({ theme, dDayLeft }) =>
        dDayLeft <= 2
          ? css`
              color: ${theme.palette.sementic.red300};
            `
          : css`
              color: ${theme.palette.greyScale.white};
            `};
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
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  & > svg {
    z-index: 1;
    margin-top: 31px;
    margin-bottom: 32px;
  }
  & > p {
    ${({ theme }) => theme.typo.text.T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-top: 16px;
  }
`;
