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
import { ReactComponent as D1 } from '@assets/illusts/walk/d-1.svg';
import { ReactComponent as D2 } from '@assets/illusts/walk/d-2.svg';
import { ReactComponent as DDay } from '@assets/illusts/walk/d-day.svg';
import renderItemIllustWalk from '@lib/utils/kid/renderItemIllustWalk';
import InterestBadge from '@components/common/badges/InterestBadge';
import SwipeToWalk from '@components/walk/SwipeToWalk';
import useWalkMoneyRoad from '@lib/hooks/useWalkMoneyRoad';
import WalkDefault from '@components/walk/WalkDefault';
import Modals from '@components/common/modals/Modals';
import useModals from '@lib/hooks/useModals';

function Walk() {
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const { openModal } = useModals();

  return (
    <Wrapper>
      {walkingMoneyRoads ? (
        <>
          <WalkDefault walkingMoneyRoads={walkingMoneyRoads} />
        </>
      ) : (
        '돈길 없음'
      )}
    </Wrapper>
  );
}

export default Walk;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  height: calc(var(--vh, 1vh) * 100);
`;
