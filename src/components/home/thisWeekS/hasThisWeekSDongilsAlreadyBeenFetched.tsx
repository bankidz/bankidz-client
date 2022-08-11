import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectThisWeekSDongils } from '@store/slices/thisWeekSDongilsSlice';

function hasThisWeekSDongilsAlreadyBeenFetched() {
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  const selectedKid = useAppSelector(selectSelectedKid);

  const found = thisWeekSDongils?.find(
    (thisWeekSDongil) => thisWeekSDongil.userName === selectedKid?.username,
  );
  if (found === undefined) {
    return false;
  } else {
    return true;
  }
}

export default hasThisWeekSDongilsAlreadyBeenFetched;
