import styled from 'styled-components';
import Button from '@components/common/buttons/Button';
import { IChallengeDTO } from '@store/slices/notPayedInterestsSlice';
import useModals from '@lib/hooks/useModals';
import Modals, { modals } from '@components/common/modals/Modals';
import { MODAL_CLOSE_TRANSITION_TIME } from '@lib/constants/MODAL';
import getCompletionDate from '@lib/utils/get/getCompletionDate';

interface InterestTOPayListProps {
  challengeDTOList: IChallengeDTO[];
}

function InterestToPayList({ challengeDTOList }: InterestTOPayListProps) {
  const { openModal } = useModals();

  function handlePaidButtonClick() {
    console.log('click');
    openModal(modals.secondaryModal, {
      onSubmit: () => {
        console.log('handle submit');
      },
      headerText: '이자지급을 완료했어요',
      bodyText: '자녀의 급융습관이 쑥쑥 자라고 있어요!',
      hasBadge: false,
    });
  }

  function handleIsPaidButtonClick(
    interestPrice: number,
    title: string,
    weeks: number,
    successWeeks: number,
  ) {
    openModal(modals.quaternaryModal, {
      onExtraSubmit: () => {
        setTimeout(() => {
          handlePaidButtonClick();
        }, MODAL_CLOSE_TRANSITION_TIME);
      },
      interestPrice,
      title,
      weeks,
      successWeeks,
      shouldCloseOnOverlayClick: true,
    });
  }

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
          <Button
            label="지급 완료하기"
            onClick={() =>
              handleIsPaidButtonClick(
                challengeDTO.interestPrice,
                challengeDTO.challenge.title,
                challengeDTO.challenge.weeks,
                challengeDTO.challenge.successWeeks,
              )
            }
          />
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
