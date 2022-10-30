import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import Summary from './Summary';

function ParentSummary() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { data: parentSummary } = useQuery(
    [queryKeys.CHALLENGE_KID_PROGRESS, selectedKid?.kidId],
    () => challengeAPI.getChallengeKidProgress(selectedKid!.kidId),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

  return (
    <Wrapper>
      <Summary
        variant="ParentHome"
        currentSavings={parentSummary?.weekInfo?.currentSavings!}
        totalPrice={parentSummary?.weekInfo?.totalPrice!}
        username={selectedKid?.username}
      />
    </Wrapper>
  );
}

export default ParentSummary;

export const parentSummaryStyle = css`
  margin-top: 198px;
`;

const Wrapper = styled.div`
  ${parentSummaryStyle}
`;
