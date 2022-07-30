import WalkDefault from '@components/walk/WalkDefault';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  dispatchResetIsPatched,
  selectWalkingDongils,
} from '@store/slices/walkingDongilSlice';
import { useEffect } from 'react';
import styled from 'styled-components';

function Walk() {
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // @ts-expect-error
    dispatch(dispatchResetIsPatched({}));
  }, [walkingDongils]);

  return (
    <Wrapper>
      {walkingDongils ? (
        <>
          <WalkDefault walkingDongils={walkingDongils} />
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
