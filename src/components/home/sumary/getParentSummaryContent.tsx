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

  let parentSummaryContent;
  if (parentSummariesStatus === 'loading') {
    parentSummaryContent = (
      <Summary
        variant="ParentHome"
        currentSavings={0}
        totalPrice={0}
        username={'loading'}
      />
    );
  } else if (parentSummariesStatus === 'succeeded') {
    const getSelectedKidSParentSummary = (kidId: number) => {
      const found = parentSummaries?.find(
        (parentSummary) => parentSummary.kidId === kidId,
      );
      return found;
    };

    const selectedKidSParentSummary = getSelectedKidSParentSummary(
      selectedKid?.kidId!,
    );
    if (selectedKidSParentSummary) {
      const { currentSavings, totalPrice } = selectedKidSParentSummary.weekInfo;
      parentSummaryContent = (
        <Summary
          variant="ParentHome"
          currentSavings={currentSavings!}
          totalPrice={totalPrice!}
          username={selectedKid?.username}
        />
      );
    }
  } else if (parentSummariesStatus === 'failed') {
    parentSummaryContent = <p>Failed</p>;
  }
  return parentSummaryContent;
}

export default getParentSummaryContent;
