import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectProposedDongils } from '@store/slices/proposedDongilsSlice';

function hasProposedDongilsAlreadyBeenFetched() {
  const proposedDongils = useAppSelector(selectProposedDongils);
  const selectedKid = useAppSelector(selectSelectedKid);

  const found = proposedDongils?.find(
    (proposedDongil) => proposedDongil.userName === selectedKid?.username,
  );
  if (found === undefined) {
    return false;
  } else {
    return true;
  }
}

export default hasProposedDongilsAlreadyBeenFetched;
