import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import Summary from './Summary';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import queryKeys from '@lib/constants/queryKeys';

function KidSummary() {
  const { data: kidSummary } = useQuery(
    queryKeys.CHALLENGE_PROGRESS,
    challengeAPI.getChallengeProgress,
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

  return (
    <SummaryWrapper>
      <Summary
        variant="KidHome"
        currentSavings={kidSummary?.currentSavings}
        totalPrice={kidSummary?.totalPrice}
      />
    </SummaryWrapper>
  );
}

export default KidSummary;

export const kidSummaryWrapperStyle = css`
  margin-top: 198px;
`;

const SummaryWrapper = styled.div`
  ${kidSummaryWrapperStyle}
`;
