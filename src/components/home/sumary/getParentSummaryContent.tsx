import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import Summary from './Summary';

function getParentSummaryContent() {
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const parentSummaries = useAppSelector(selectParentSummaries);
  const selectedKid = useAppSelector(selectSelectedKid);

  if (parentSummariesStatus === 'loading') {
    return (
      <Summary
        variant="ParentHome"
        currentSavings={0}
        totalPrice={0}
        username={'loading'}
      />
    );
  } else if (parentSummariesStatus === 'succeeded') {
    const selectedKidSParentSummary = getSelectedKidSParentSummary(
      selectedKid?.kidId!,
    );
    if (selectedKidSParentSummary) {
      const { currentSavings, totalPrice } = selectedKidSParentSummary.weekInfo;
      return (
        <Summary
          variant="ParentHome"
          currentSavings={currentSavings!}
          totalPrice={totalPrice!}
          username={selectedKid?.username}
        />
      );
    }
  } else if (parentSummariesStatus === 'failed') {
    return <p>Failed</p>;
  }

  function getSelectedKidSParentSummary(kidId: number) {
    const found = parentSummaries?.find(
      (parentSummary) => parentSummary.kidId === kidId,
    );
    return found;
  }
}

export default getParentSummaryContent;
