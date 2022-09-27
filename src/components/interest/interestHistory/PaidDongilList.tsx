import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function PaidDongilList() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { status, data: notPaidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'payed', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('payed', selectedKid?.kidId!),
  );

  return <Wrapper></Wrapper>;
}

export default PaidDongilList;

const Wrapper = styled.div``;
