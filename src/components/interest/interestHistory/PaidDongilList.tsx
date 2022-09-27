import EmptyDongil from '@components/home/EmptyDongil';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import getCompletionDate from '@lib/utils/get/getCompletionDate';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function PaidDongilList() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { data: paidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'payed', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('payed', selectedKid?.kidId!),
  );

  let content;
  if (paidInterests?.achievedChallengeListDTO.challengeDTOList.length === 0) {
    content = <EmptyDongil subject="지급 완료한" />;
  } else {
    content = paidInterests?.achievedChallengeListDTO?.challengeDTOList?.map(
      (challenge) => (
        <Block>
          <header>
            <h1>{challenge.challenge.title}</h1>
            <span>{`${getCompletionDate(
              challenge.challenge.createdAt,
              challenge.challenge.weeks,
              'YYYY.MM.DD',
            )} 지급`}</span>
          </header>
          <sub>{`${challenge.interestPrice.toLocaleString('ko-KR')}원`}</sub>
        </Block>
      ),
    );
  }

  return <Wrapper>{content}</Wrapper>;
}

export default PaidDongilList;

const Wrapper = styled.div`
  margin-top: 44px;
`;

const Block = styled.div`
  width: 100%;
  height: 74px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.palette.greyScale.white};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 16px;

  header h1 {
    ${({ theme }) => theme.typo.button.Title_T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-bottom: 8px;
  }
  header span {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  sub {
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
