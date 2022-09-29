import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IWeekDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import styled from 'styled-components';
import Summary from './Summary';

interface KidSummaryProps {
  kidSummaryStatus: TStatus;
  kidSummary: IWeekDTO | undefined;
}

function KidSummary({ kidSummaryStatus, kidSummary }: KidSummaryProps) {
  let content;
  if (kidSummaryStatus === 'success') {
    const { currentSavings, totalPrice } = kidSummary!;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings}
        totalPrice={totalPrice}
      />
    );
  } else {
    content = <SkeletonSummary variant="KidHome" />;
  }

  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
