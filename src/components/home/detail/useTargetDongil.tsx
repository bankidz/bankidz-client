import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { selectThisWeekSDongils } from '@store/slices/thisWeekSDongilsSlice';
import { useQuery } from 'react-query';

function useTargetDongil(id: string) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);

  const { data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
  );

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
