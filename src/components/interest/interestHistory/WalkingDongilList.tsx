import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import EmptyDongil from '@components/home/EmptyDongil';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import getContractEndDate from '@lib/utils/get/getContractEndDate';
import getWeekNumberByMonth from '@lib/utils/get/getWeekNumberByMonth';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';

function WalkingDongilList() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
  );

  let content;
  if (thisWeekSDongils?.challengeList.length === 0) {
    content = <EmptyDongil subject="걷고있는" />;
  } else {
    content = thisWeekSDongils?.challengeList?.map((challenge) => {
      const contractEndDate = getContractEndDate(
        challenge.createdAt,
        challenge.weeks,
      );
      const { year, month, weekNo } = getWeekNumberByMonth(contractEndDate);
      const current = dayjs();
      const leftOverWeek = current.diff(contractEndDate, 'week') * -1;

      return (
        <StyledLink
          key={challenge.id}
          to={`/detail/interest/${challenge.id}`}
          state={{ detailPrev: 'interest' }}
        >
          <FirstRow>
            <div className="text-wrapper">
              <h1>{challenge.title}</h1>
              <span>{`${year}년 ${month}월 ${weekNo}주 만료`}</span>
            </div>
            <Badge>{`${leftOverWeek}주 남음`}</Badge>
          </FirstRow>
          <SecondRow>
            <span>{`총 ${challenge.weeks}주 중에 ${challenge.successWeeks}주 성공해서 쌓인 이자`}</span>
            <h1>{`${(
              (challenge.weekPrice *
                challenge.interestRate *
                challenge.successWeeks) /
              100
            ).toLocaleString('ko-KR')}원`}</h1>
          </SecondRow>
        </StyledLink>
      );
    });
  }

  return <Wrapper>{content}</Wrapper>;
}

export default WalkingDongilList;

const Wrapper = styled.div`
  margin-top: 44px;
`;

const StyledLink = styled(Link)`
  & + & {
    margin-top: 16px;
  }
  width: 100%;
  height: 155px;
  border-radius: ${({ theme }) => theme.radius.large};
  background: ${({ theme }) => theme.palette.greyScale.white};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 26px 16px;
`;

const FirstRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .text-wrapper {
    > h1 {
      ${({ theme }) => theme.typo.text.T_16_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
      margin-top: 0;
      margin-bottom: 8px;
    }
    > span {
      ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
  }
`;

const SecondRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  > span {
    text-align: right;
    width: 100%;
    height: 12px;
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-bottom: 8px;
  }
  > h1 {
    ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin: 0;
  }
`;

const Badge = styled.div`
  width: 75px;
  height: 26px;
  background: ${({ theme }) => theme.palette.main.yellow400};
  ${({ theme }) => theme.typo.tag.T_12_EB}
  color: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.small};

  line-height: 28px;
  text-align: center;
`;
