import SuggestBadge from '@components/common/badges/SuggestBadge';
import { modals } from '@components/common/modals/Modals';
import useModals from '@lib/hooks/useModals';
import { EMoneyRoadStatus } from '@lib/types/common';
import { getDate } from '@lib/utils/common/getDate';
import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface PendingMoneyRoadItemProps {
  pendingMoneyRoad: IMoneyRoad;
  onDeleteCheckOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingMoneyRoadItem({
  pendingMoneyRoad,
  onDeleteCheckOpen,
  setIdToDelete,
}: PendingMoneyRoadItemProps) {
  const { openModal } = useModals();
  const {
    id,
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
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
    });
  }

  // 거절됨
  function openSenaryModal() {
    openModal(modals.senaryModal, {
      onSubmit: () => {
        onDeleteCheckOpen();
        setIdToDelete(id);
      },
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      comment: comment?.content,
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
