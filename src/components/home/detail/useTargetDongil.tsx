import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';

function useTargetDongil(id: string) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);

  const { data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
  );
  const { data: thisWeekSDongilsData } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
  );

  if (isKid === true) {
    return walkingDongils?.find(
      (walkingDongil) => walkingDongil.id === parseInt(id!),
    )!;
  } else if (isKid === false) {
    return thisWeekSDongilsData?.challengeList.find(
      (thisWeekSDongil) => thisWeekSDongil.id === parseInt(id!),
    )!;
  }
}

export default useTargetDongil;
