import LargeSpacer from '@components/layout/LargeSpacer';
import WalkDefault from '@components/walk/WalkDefault';
import WalkError from '@components/walk/WalkError';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  fetchOverView,
  selectOverViewStatus,
  selectUserOverView,
} from '@store/slices/overViewSlice';
import {
  dispatchResetIsPatched,
  selectWalkingDongils,
} from '@store/slices/walkingDongilsSlice';
import { useEffect } from 'react';
import styled from 'styled-components';

function Walk() {
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const overViewStatus = useAppSelector(selectOverViewStatus);
  const user = useAppSelector(selectUserOverView);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  // 성우의 제안: walkAbledDongils -> walkableDongils
  // Abled는 영문법상도 맞지 않습니다.
  // code spell checker 사용을 추천드립니다.
  const walkAbledDongils = walkingDongils?.filter(
    (dongil) => dongil.challengeStatus === 'WALKING',
  );
  console.log(walkAbledDongils);
  useEffect(() => {
    // @ts-expect-error
    dispatch(dispatchResetIsPatched({}));
  }, [walkingDongils]);

  useEffect(() => {
    if (overViewStatus === 'idle') {
      dispatch(fetchOverView({ axiosPrivate }));
    }
  }, []);

  return (
    <Wrapper>
      {walkAbledDongils.length > 0 ? (
        <>
          <WalkDefault walkingDongils={walkAbledDongils} user={user} />
        </>
      ) : (
        <WalkError />
      )}
    </Wrapper>
  );
}

export default Walk;

const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
