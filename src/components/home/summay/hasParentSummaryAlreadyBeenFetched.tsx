import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectParentSummaries } from '@store/slices/parentSummariesSlice';

function hasParentSummaryAlreadyBeenFetched() {
  const parentSummaries = useAppSelector(selectParentSummaries);
  const selectedKid = useAppSelector(selectSelectedKid);

  const found = parentSummaries?.find(
    (parentSummary) => parentSummary.kidId === selectedKid?.kidId,
  );
  if (found === undefined) {
    return false;
  } else {
    return true;
  }
}

export default hasParentSummaryAlreadyBeenFetched;
