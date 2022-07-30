import WalkDefault from '@components/walk/WalkDefault';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchResetIsPatched,
  selectWalkingMoneyRoads,
} from '@store/slices/walkingMoneyRoadsSlice';
import { useEffect } from 'react';
import styled from 'styled-components';

function Walk() {
  const walkingMoneyRoads = useAppSelector(selectWalkingMoneyRoads);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dispatchResetIsPatched({}));
  }, [walkingMoneyRoads]);

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
