import CustomRotatingLines from '@components/common/loadingSpinners/CustomRotatingLines';
import SkeletonInterestToPayList from '@components/common/skeletons/SkeletonInterestToPayList';
import EmptyDongil from '@components/home/EmptyDongil';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
} from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import InterestToPayList from './InterestToPayList';

function InterestToPaySection() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);

  const { status, data: notPaidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'notPayed', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('notPayed', selectedKid?.kidId!),
  );

  let interestToPay;
  if (status === 'success') {
    interestToPay =
      notPaidInterests?.achievedChallengeListDTO.totalInterestPrice;
  } else {
    interestToPay = 0;
  }

  let content;
  if (status === 'success') {
    if (notPaidInterests?.achievedChallengeListDTO.totalInterestPrice === 0) {
      content = (
        <EmptyDongilWrapper>
          <EmptyDongil subject="아직 완주한" />
        </EmptyDongilWrapper>
      );
    } else {
      content = (
        <InterestToPayList
          challengeDTOList={
            notPaidInterests?.achievedChallengeListDTO?.challengeDTOList!
          }
        />
      );
    }
  } else {
    content = <SkeletonInterestToPayList />;
  }

  return (
    <>
      <Header hasMultipleKids={hasMultipleKids!}>
        <h1>지급이 필요한 이자</h1>
        <h2>{interestToPay}원 </h2>
        {status === 'loading' && (
          <CustomRotatingLinesWrapper>
            <CustomRotatingLines width="15" />
          </CustomRotatingLinesWrapper>
        )}
      </Header>
      {content}
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

const CustomRotatingLinesWrapper = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 59px;
  top: 39px;
  transform: translate3d(-50%, -50%, 0);
`;

const EmptyDongilWrapper = styled.div`
  margin-top: 40px;
`;
