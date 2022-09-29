import LoadingSpinner from '@components/common/loaders/LoadingSpinner';
import EmptyDongil from '@components/home/EmptyDongil';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import getCompletionDate from '@lib/utils/get/getCompletionDate';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function PaidDongilList() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { status, data: paidInterests } = useQuery(
    [queryKeys.CHALLENGE_KID_ACHIEVED, 'paid', selectedKid?.kidId],
    () => challengeAPI.getChallengeKidAchieved('paid', selectedKid?.kidId!),
  );
  const navigate = useNavigate();

  let content;
  if (status === 'success') {
    if (paidInterests?.achievedChallengeListDTO.challengeDTOList.length === 0) {
      content = <EmptyDongil subject="지급 완료한" />;
    } else {
      content = paidInterests?.achievedChallengeListDTO?.challengeDTOList?.map(
        (challengeDTO) => (
          <StyledButton
            key={challengeDTO.challenge.id}
            onClick={() => {
              navigate(`/detail/achieved/${challengeDTO.challenge.id}`, {
                state: {
                  isPaid: true,
                },
              });
            }}
          >
            <header>
              <h1>{challengeDTO.challenge.title}</h1>
              <span>{`${getCompletionDate(
                challengeDTO.challenge.createdAt,
                challengeDTO.challenge.weeks,
                'YYYY.MM.DD',
              )} 지급`}</span>
            </header>
            <sub>{`${challengeDTO.interestPrice.toLocaleString(
              'ko-KR',
            )}원`}</sub>
          </StyledButton>
        ),
      );
    }
  } else {
    content = (
      <LoadingSpinnerWrapper>
        <LoadingSpinner />
      </LoadingSpinnerWrapper>
    );
  }

  return <Wrapper>{content}</Wrapper>;
}

export default PaidDongilList;

const Wrapper = styled.div`
  margin-top: 44px;
`;

const StyledButton = styled.button`
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

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  height: 162px;
`;
