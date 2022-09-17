import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Summary from './Summary';

function KidSummary() {
  const { status, data: kidSummary } = useQuery(
    queryKeys.KID_SUMMARY,
    challengeAPI.getChallengeProgress,
  );

  let content: JSX.Element = <></>;
  if (status === 'loading') {
    content = <SkeletonSummary variant="KidHome" />;
  } else if (status === 'success') {
    const { currentSavings, totalPrice } = kidSummary;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings}
        totalPrice={totalPrice}
      />
    );
  } else if (status === 'error') {
    content = <Summary variant="KidHome" currentSavings={0} totalPrice={0} />;
  }

  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
