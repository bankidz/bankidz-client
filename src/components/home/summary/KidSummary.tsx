import SkeletonSummary from '@components/skeletons/SkeletonSummary';
import { useAppSelector } from '@store/app/hooks';
import {
  selectKidSummary,
  selectKidSummaryStatus,
} from '@store/slices/kidSummarySlice';
import styled from 'styled-components';
import Summary from './Summary';

function KidSummary() {
  const kidSummary = useAppSelector(selectKidSummary);
  const kidSummaryStatus = useAppSelector(selectKidSummaryStatus);

  let content: JSX.Element = <></>;
  if (kidSummaryStatus === 'loading') {
    content = <SkeletonSummary variant="KidHome" />;
  } else if (kidSummaryStatus === 'succeeded') {
    const { currentSavings, totalPrice } = kidSummary!;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
      />
    );
  } else if (kidSummaryStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
