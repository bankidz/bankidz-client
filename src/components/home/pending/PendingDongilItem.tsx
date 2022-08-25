import ProposalBadge from '@components/common/badges/ProposalBadge';
import { modals } from '@components/common/modals/Modals';
import useModals from '@lib/hooks/useModals';
import { IDongil } from '@lib/types/IDongil';
import getFormattedTimeStamp from '@lib/utils/get/getFormattedTimeStamp';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface PendingDongilItemProps {
  pendingDongil: IDongil;
  onWarningDeleteSheetOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingDongilItem({
  pendingDongil,
  onWarningDeleteSheetOpen,
  setIdToDelete,
}: PendingDongilItemProps) {
  const { openModal } = useModals();
  const {
    id,
    challengeStatus,
    createdAt,
    interestRate,
    isMom,
    itemName,
    title,
    totalPrice,
    weekPrice,
    weeks,
    comment,
    fileName,
  } = pendingDongil;

  // 제안중
  function openQuinaryModal() {
    openModal(modals.receiptModal, {
      variant: 'proposing',
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      fileName,
    });
  }

  // 거절됨
  function openSenaryModal() {
    openModal(modals.receiptModal, {
      variant: 'rejected',
      onSubmit: () => {
        onWarningDeleteSheetOpen();
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
      comment,
      fileName,
    });
  }

  function handleClick() {
    if (challengeStatus === 'PENDING') {
      openQuinaryModal();
    } else if (challengeStatus === 'REJECTED') {
      openSenaryModal();
    }
  }

  return (
    <>
      <StyledButton onClick={handleClick}>
        <div className="text-wrapper">
          <span className="title">{title}</span>
          <span className="createdAt">
            {getFormattedTimeStamp(createdAt, 'YYYY.MM.DD')}
          </span>
        </div>
        <ProposalBadge isProposing={challengeStatus === 'PENDING'} />
      </StyledButton>
    </>
  );
}

export default PendingDongilItem;

const StyledButton = styled.button`
  width: 100%;
  height: 68px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 12px;
  padding: 18px 16px 16px 16px;
  display: flex;
  justify-content: space-between;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .title {
      margin-bottom: 8px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }

    .createdAt {
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
  }
`;
