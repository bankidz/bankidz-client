import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectParentSummaries } from '@store/slices/parentSummariesSlice';
import { selectProposedDongils } from '@store/slices/proposedDongilsSlice';
import { selectThisWeekSDongils } from '@store/slices/thisWeekSDongilsSlice';

function useIsFetched(
  target: 'parentSummaries' | 'proposedDongils' | 'thisWeekSDongils',
) {
  const parentSummaries = useAppSelector(selectParentSummaries);
  const proposedDongils = useAppSelector(selectProposedDongils);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  const selectedKid = useAppSelector(selectSelectedKid);

  let isFetched;
  if (target === 'parentSummaries') {
    isFetched = parentSummaries?.find(
      (parentSummary) => parentSummary.kidId === selectedKid?.kidId,
    );
  } else if (target === 'proposedDongils') {
    isFetched = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === selectedKid?.username,
    );
  } else if (target === 'thisWeekSDongils') {
    isFetched = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === selectedKid?.username,
    );
  }
  return isFetched;
}

export default useIsFetched;
