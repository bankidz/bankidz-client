import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/common/buttons/Button';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import getCompletionDate from '@lib/utils/get/getCompletionDate';
import { IAchievedChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';

interface InterestTOPayListProps {
  challengeDTOList: IAchievedChallengeDTO[];
}

function InterestToPayList({ challengeDTOList }: InterestTOPayListProps) {
  const { openModal } = useModals();
  const queryClient = useQueryClient();
  const selectedKid = useAppSelector(selectSelectedKid);
  const payMutation = useMutation(challengeAPI.patchChallengeInterestPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.CHALLENGE_KID_ACHIEVED,
        'unPaid',
        selectedKid?.kidId,
      ]);
      queryClient.invalidateQueries([
        queryKeys.CHALLENGE_KID_ACHIEVED,
        'paid',
        selectedKid?.kidId,
      ]);
    },
  });
  const navigate = useNavigate();

  // 2. 지급했어요
  const handlePaidButtonClick = (id: number) => {
    openModal(modals.secondaryModal, {
      headerText: '이자지급을 완료했어요',
      bodyText: '자녀의 급융습관이 쑥쑥 자라고 있어요!',
      hasBadge: false,
      shouldCloseOnOverlayClick: true,
    });
  };

  // 1. 지급 완료하기
  const handleCompletePaymentButtonClick = (
    interestPrice: number,
    id: number,
    title: string,
    weeks: number,
    successWeeks: number,
  ) => {
    openModal(modals.quaternaryModal, {
      onExtraSubmit: () => {
        payMutation.mutate(id);
        setTimeout(() => {
          handlePaidButtonClick(id);
        }, MODAL_CLOSE_TRANSITION_TIME);
      },
      interestPrice,
      title,
      weeks,
      successWeeks,
      shouldCloseOnOverlayClick: true,
    });
  };

  return (
    <Wrapper>
      <Modals />
      {challengeDTOList?.map((challengeDTO) => (
        <Block key={challengeDTO.challenge.id}>
          <div className="text-wrapper">
            <span className="date">
              {`${getCompletionDate(
                challengeDTO.challenge.createdAt,
                challengeDTO.challenge.weeks,
                'YYYY.MM.DD',
              )} 완주성공`}
            </span>
            <h1>{challengeDTO.challenge.title}</h1>
            <div className="amount-wrapper">
              <span className="total-interest">총 이자</span>
              <span className="amount">{challengeDTO.interestPrice}원</span>
            </div>
          </div>
          <DoubleButtonWrapper>
            <GoToDetailButton
              onClick={() => {
                navigate(`/detail/achieved/${challengeDTO.challenge.id}`, {
                  state: {
                    isPaid: false,
                  },
                });
              }}
            >
              자세히 보기
            </GoToDetailButton>
            <CompletePaymentButton
              label="지급 완료하기"
              onClick={() =>
                handleCompletePaymentButtonClick(
                  challengeDTO.interestPrice,
                  challengeDTO.challenge.id,
                  challengeDTO.challenge.title,
                  challengeDTO.challenge.weeks,
                  challengeDTO.challenge.successWeeks,
                )
              }
            />
          </DoubleButtonWrapper>
        </Block>
      ))}
    </Wrapper>
  );
}

export default InterestToPayList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const GoToDetailButton = styled.button`
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.palette.greyScale.grey300};
  border-radius: ${({ theme }) => theme.radius.medium};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.typo.button.Primary_T_15_EB};
  color: ${({ theme }) => theme.palette.greyScale.white};
`;

const CompletePaymentButton = styled(Button)`
  height: 40px;
`;

const DoubleButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 16px;

  width: 100%;
  height: 179px;
  border-radius: ${({ theme }) => theme.radius.large};
  background: ${({ theme }) => theme.palette.greyScale.white};

  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    height: 12px;
    line-height: 12px;
    margin-top: 8px;
  }
  h1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 276px;
    height: 22px;
    line-height: 22px;
    margin-top: 4px;
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  .amount-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 24px;

    .total-interest {
      ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      margin-right: 12px;
    }
    .amount {
      ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }
  & + & {
    margin-top: 16px;
  }
`;
