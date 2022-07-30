import moment from 'moment';
import WalkingItemNameButton from '@components/walk/WalkingItemNameButton';
import { calcRatio } from '@lib/styles/theme';
import getColorByLevel from '@lib/utils/common/getColorByLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectAuth, selectLevel } from '@store/slices/authSlice';
import {
  IMoneyRoad,
  selectisWalkingMoneyRoadsPatched,
} from '@store/slices/walkingMoneyRoadsSlice';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Polygon } from '@assets/icons/walking-selector-polygon.svg';
import { ReactComponent as D1 } from '@assets/illusts/walk/d-1.svg';
import { ReactComponent as D2 } from '@assets/illusts/walk/d-2.svg';
import { ReactComponent as DDay } from '@assets/illusts/walk/d-day.svg';
import renderItemIllustWalk from '@lib/utils/kid/renderItemIllustWalk';
import InterestBadge from '@components/common/badges/InterestBadge';
import SwipeToWalk from '@components/walk/SwipeToWalk';
import useWalkMoneyRoad from '@lib/hooks/useWalkMoneyRoad';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';

function WalkDefault({
  walkingMoneyRoads,
}: {
  walkingMoneyRoads: IMoneyRoad[];
}) {
  const level = useAppSelector(selectLevel);
  const patched = useAppSelector(selectisWalkingMoneyRoadsPatched);
  const { username, isKid, isFemale } = useAppSelector(selectAuth);
  const colorByLevel = getColorByLevel(level!);
  const { getWeeklySuccess } = useWalkMoneyRoad(walkingMoneyRoads);
  const dDayLeft = 7 - moment().day();
  const [selected, setSelected] = useState<IMoneyRoad>(walkingMoneyRoads[0]);
  const { openModal, closeModal } = useModals();
  const { getValue, setValue, getIsAchieved, setIsAchieved } =
    useWalkMoneyRoad(walkingMoneyRoads);

  const onClickWalkingItemNameButton = (v: IMoneyRoad) => {
    setSelected(v);
  };

  useEffect(() => {
    console.log(patched);
    if (getWeeklySuccess() && patched) {
      openModal(modals.primaryModal, {
        onSubmit: () => {
          closeModal(modals.primaryModal);
        },
        isKid: isKid,
        isFemale: isFemale,
        headerText: `${username} 이번주 저금 성공`,
        bodyText: '뱅키즈와 함께 돈길만 걸어요',
      });
    }
  }, [walkingMoneyRoads]);

  return (
    <Wrapper>
      <Header colorByLevel={colorByLevel}>
        <Title dDayLeft={dDayLeft}>
          <p>돈길 걷기</p>

          <div>
            <p>이번주 리셋까지</p>
            {dDayLeft > 2 && <p>D-{dDayLeft}</p>}
            {dDayLeft === 2 && <D2 />}
            {dDayLeft === 1 && <D1 />}
            {dDayLeft === 0 && <DDay />}
          </div>
        </Title>
        <MoneyRoadList>
          {walkingMoneyRoads.map((v) => (
            <div onClick={() => onClickWalkingItemNameButton(v)} key={v.id}>
              <WalkingItemNameButton
                itemName={v.itemName}
                isSelected={selected?.id === v.id}
                isNoticed={!getIsAchieved(v.id)}
              />
              {selected?.id === v.id && <Polygon />}
            </div>
          ))}
        </MoneyRoadList>
      </Header>
      <Content>
        {renderItemIllustWalk(selected.itemName)}
        <InterestBadge interestRate={selected.interestRate} />
        <p>{selected.title}</p>
        <SwipeToWalk
          interestRate={selected.interestRate}
          weekPrice={selected.weekPrice}
          value={getValue(selected.id)}
          setValue={setValue}
          id={selected.id}
          isAchieved={getIsAchieved(selected.id)}
          setIsAchieved={setIsAchieved}
        />
      </Content>
      <Modals />
    </Wrapper>
  );
}

export default WalkDefault;

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
        dDayLeft > 2 &&
        css`
          color: ${theme.palette.greyScale.white};
        `};
    }
    & > svg {
      margin-top: 8px;
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
    margin-bottom: 92px;
  }
`;
