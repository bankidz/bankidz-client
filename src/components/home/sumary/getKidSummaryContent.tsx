import { useAppSelector } from '@store/app/hooks';
import {
  selectKidSummary,
  selectKidSummaryStatus,
} from '@store/slices/kidSummarySlice';
import Summary from './Summary';

function getKidSummaryContent() {
  const kidSummary = useAppSelector(selectKidSummary);
  const kidSummaryStatus = useAppSelector(selectKidSummaryStatus);

  let kidSummaryContent;
  if (kidSummaryStatus === 'loading') {
    kidSummaryContent = (
      <Summary variant="KidHome" currentSavings={0} totalPrice={0} />
    );
  } else if (kidSummaryStatus === 'succeeded') {
    const { currentSavings, totalPrice } = kidSummary!;
    kidSummaryContent = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
      />
    );
  } else if (kidSummaryStatus === 'failed') {
    kidSummaryContent = <p>Failed</p>;
  }
  return kidSummaryContent;
}

export default getKidSummaryContent;
