import { useQuery } from 'react-query';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import { selectSelectedKid } from '@store/slices/kidsSlice';

/**
 * [/detail Page 진입 상황]
 * 1. 홈 (자녀) - 걷고있는 돈길 -> 걷고있는 돈길, /detail
 * 2. 홈 (부모) - 금주의 돈길 -> 금주의 돈길, /detail
 * 3. 이자 내역 (부모) - 지급이 필요한 이자 -> 완주한 돈길, /detail/achieved, state.isPaid: false
 * 4. 이자 내역 (부모) - 걷고있는 돈길 -> 걷고있는 돈길, /detail/interest
 * 5. 이자 내역 (부모) - 지급 완료한 돈길 -> 완주한 돈길, /detail/achieved, state.isPaid: true
 */
function useTargetDongil(id: string, isPaid: boolean | undefined) {
  const isKid = useAppSelector(selectIsKid);
  const selectedKid = useAppSelector(selectSelectedKid);

  const { data: paidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'paid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('paid', selectedKid?.kidId!),
    {
      enabled: isPaid === true,
    },
  );
  const { data: unPaidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'unPaid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('unPaid', selectedKid?.kidId!),
    {
      enabled: isPaid === false,
    },
  );
  const { data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      enabled: isPaid === undefined && isKid === true,
    },
  );
  const { data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
    {
      enabled: isPaid === undefined && isKid === false,
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
