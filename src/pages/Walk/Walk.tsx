import LargeSpacer from '@components/layout/LargeSpacer';
import WalkDefault from '@components/walk/WalkDefault';
import WalkError from '@components/walk/WalkError';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useUserQuery from '@lib/hooks/queries/useUserQuery';
import { useAppDispatch } from '@store/app/hooks';
import { resetDongilPatched } from '@store/slices/walkingDongilsSlice';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function Walk() {
  const { status: walkingDongilsStatus, data: walkingDongilsData } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
  );
  const dispatch = useAppDispatch();
  const { data: userData, status: userStatus } = useUserQuery();
  const walkAbleDongils = walkingDongilsData?.filter(
    (dongil) => dongil.challengeStatus === 'WALKING',
  );
  useEffect(() => {
    dispatch(resetDongilPatched());
  }, [walkingDongilsData]);

  const status = walkingDongilsStatus === 'success' && userStatus === 'success';

  return (
    <Wrapper>
      {status && (
        <>
          {walkingDongilsData!.length > 0 ? (
            <>
              <WalkDefault
                walkingDongils={walkAbleDongils!}
                userData={userData!.user}
              />
            </>
          ) : (
            <WalkError />
          )}
        </>
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
