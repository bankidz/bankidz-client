import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useAPIError from '@lib/hooks/errorHandler/useAPIError';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';

function useTargetDongil(id: string, isPaid: boolean | undefined) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);
  const { handleError } = useAPIError({
    500: {
      default: () => {
        console.log('expected error');
      },
    },
  });

  const { data: paidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'paid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('paid', selectedKid?.kidId!),
    {
      onError: handleError,
    },
  );
  const { data: unPaidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'unPaid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('unPaid', selectedKid?.kidId!),
    {
      onError: handleError,
    },
  );
  const { data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      onError: handleError,
    },
  );
  const { data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
    {
      onError: handleError,
    },
  );

  let targetDongil;
  if (isPaid === true) {
    paidInterests?.achievedChallengeListDTO.challengeDTOList.map(
      (challengeDTO) => {
        if (challengeDTO.challenge.id === parseInt(id!)) {
          targetDongil = challengeDTO.challenge;
        }
      },
    );
  } else if (isPaid === false) {
    unPaidInterests?.achievedChallengeListDTO.challengeDTOList.map(
      (challengeDTO) => {
        if (challengeDTO.challenge.id === parseInt(id!)) {
          targetDongil = challengeDTO.challenge;
        }
      },
    );
  } else {
    if (isKid === true) {
      targetDongil = walkingDongils?.find(
        (walkingDongil) => walkingDongil.id === parseInt(id!),
      )!;
    } else if (isKid === false) {
      targetDongil = thisWeekSDongils?.challengeList.find(
        (thisWeekSDongil) => thisWeekSDongil.id === parseInt(id!),
      )!;
    }
  }

  return targetDongil;
}

export default useTargetDongil;
