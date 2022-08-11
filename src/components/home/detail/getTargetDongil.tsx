import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectThisWeekSDongils } from '@store/slices/thisWeekSDongilsSlice';
import { selectWalkingDongils } from '@store/slices/walkingDongilsSlice';

function getTargetDongil(id: string) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);

  if (isKid === true) {
    return walkingDongils?.find(
      (walkingDongil) => walkingDongil.id === parseInt(id!),
    )!;
  } else if (isKid === false) {
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.username!,
    );
    return selectedKidSThisWeekSDongils?.find(
      (selectedKidSThisWeekSDongil) =>
        selectedKidSThisWeekSDongil.id === parseInt(id!),
    )!;
  }

  function getSelectedKidSThisWeekSDongils(username: string) {
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === username,
    );
    return found?.challengeList;
  }
}

export default getTargetDongil;
