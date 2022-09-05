import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectThisWeekSDongils } from '@store/slices/thisWeekSDongilsSlice';
import { selectWalkingDongils } from '@store/slices/walkingDongilsSlice';

function useTargetDongil(id: string) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);

  if (isKid === true) {
    return walkingDongils?.find(
      (walkingDongil) => walkingDongil.id === parseInt(id!),
    )!;
  } else if (isKid === false) {
    const getSelectedKidSThisWeekSDongils = (kidId: number) => {
      const found = thisWeekSDongils?.find(
        (thisWeekSDongil) => thisWeekSDongil.kidId === kidId,
      );
      return found?.challengeList;
    };
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.kidId!,
    );

    return selectedKidSThisWeekSDongils?.find(
      (selectedKidSThisWeekSDongil) =>
        selectedKidSThisWeekSDongil.id === parseInt(id!),
    )!;
  }
}

export default useTargetDongil;
