import SuggestBadge from '@components/common/badges/SuggestBadge';
import { modals } from '@components/common/modals/Modals';
import useModals from '@hooks/useModals';
import { EMoneyRoadStatus } from '@lib/types/common';
import { getDate } from '@lib/utils/common/getDate';
import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import styled from 'styled-components';

interface PendingMoneyRoadItemProps {
  pendingMoneyRoad: IMoneyRoad;
}

function PendingMoneyRoadItem({ pendingMoneyRoad }: PendingMoneyRoadItemProps) {
  const { openModal } = useModals();
  const {
    status,
    createdAt,
    interestRate,
    isMom,
    itemName,
    title,
    totalPrice,
    weekPrice,
    weeks,
    comment,
  } = pendingMoneyRoad;

  // 제안중
  function openQuinaryModal() {
    openModal(modals.quinaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      comment: comment,
    });
  }

  // 거절됨
  function openSenaryModal() {
    openModal(modals.senaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      // comment: comment,
    });
  }

  function handleClick() {
    if (status === EMoneyRoadStatus.PENDING) {
      openQuinaryModal();
    } else if (status === EMoneyRoadStatus.REJECTED) {
      openSenaryModal();
    }
  }

  return (
    <>
      <StyledButton onClick={handleClick}>
        <div className="text-wrapper">
          <span className="title">{title}</span>
          <span className="createdAt">{getDate(createdAt)}</span>
        </div>
        <SuggestBadgeWrapper>
          <SuggestBadge
            isSuggesting={status === EMoneyRoadStatus.PENDING ? true : false}
          />
        </SuggestBadgeWrapper>
      </StyledButton>
    </>
  );
}

export default PendingMoneyRoadItem;

const StyledButton = styled.button`
  width: 100%;
  height: 68px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 16px;

    .title {
      margin-left: 12px;
      margin-bottom: 8px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }

    .createdAt {
      margin-left: 12px;
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
  }
`;

const SuggestBadgeWrapper = styled.div`
  margin-right: 16px;
`;
