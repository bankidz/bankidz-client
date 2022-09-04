import { TLevel } from '@lib/types/TLevel';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';

function useLevel() {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);

  let level;
  const temp = useAppSelector(selectLevel)!;
  if (isKid === true) {
    level = temp;
  } else if (isKid === false) {
    level = selectedKid?.level!;
  }
  return level as TLevel;
}

export default useLevel;
