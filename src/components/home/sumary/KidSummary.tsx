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
    content = <Summary variant="KidHome" currentSavings={0} totalPrice={0} />;
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
