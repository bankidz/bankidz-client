import { useQuery } from 'react-query';
import styled from 'styled-components';
import InterestToPayList from './InterestToPayList';
import LoadingSpinner from '@components/atoms/loaders/LoadingSpinner';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';

function InterestToPaySection() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  const { status, data: unPaidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'unPaid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('unPaid', selectedKid?.kidId!),
  );

  let interestToPay;
  if (status === 'success') {
    interestToPay =
      unPaidInterests?.achievedChallengeListDTO.totalInterestPrice;
  } else {
    interestToPay = 0;
  }

  return (
    <>
      <Header hasMultipleKids={hasMultipleKids!}>
        <h1>지급이 필요한 이자</h1>
        <h2>{interestToPay}원 </h2>
        {status === 'loading' && (
          <LoadingSpinnerWrapper>
            <LoadingSpinner width="15" />
          </LoadingSpinnerWrapper>
        )}
      </Header>
      {status === 'success' && (
        <InterestToPayList
          challengeDTOList={
            unPaidInterests?.achievedChallengeListDTO?.challengeDTOList
          }
        />
      )}
    </>
  );
}

export default InterestToPaySection;

const Header = styled.header<{ hasMultipleKids: boolean }>`
  margin-top: ${({ hasMultipleKids }) => (hasMultipleKids ? '159px' : '112px')};
  h1 {
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  h2 {
    margin-top: 12px;
    ${({ theme }) => theme.typo.fixed.HomeTitle_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  position: relative;
`;

const LoadingSpinnerWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 59px;
  top: 39px;
  transform: translate3d(-50%, -50%, 0);
`;
