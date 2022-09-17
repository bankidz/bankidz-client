import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IWeekDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import styled from 'styled-components';
import Summary from './Summary';

interface KidSummaryProps {
  kidSummaryStatus: TStatus;
  kidSummaryData: IWeekDTO | undefined;
}

function KidSummary({ kidSummaryStatus, kidSummaryData }: KidSummaryProps) {
  let content;
  if (kidSummaryStatus === 'loading') {
    content = <SkeletonSummary variant="KidHome" />;
  } else if (kidSummaryStatus === 'success') {
    const { currentSavings, totalPrice } = kidSummaryData!;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings}
        totalPrice={totalPrice}
      />
    );
  } else if (kidSummaryStatus === 'error') {
    content = <SkeletonSummary variant="KidHome" />;
  }

  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
