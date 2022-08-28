import { modals } from '@components/common/modals/Modals';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useModals from '@lib/hooks/useModals';
import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { useAppDispatch } from '@store/app/hooks';
import { deletePendingDongil } from '@store/slices/pendingDongilsSlice';
import { useState } from 'react';
import getFormattedTimeStamp from '@lib/utils/get/getFormattedTimeStamp';
import ProposalBadge from '@components/common/badges/ProposalBadge';
import styled from 'styled-components';

interface PendingDongilItemProps {
  pendingDongil: IDongil;
}

function PendingDongilItem({ pendingDongil }: PendingDongilItemProps) {
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

  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [deletePendingDongilStatus, setDeletePendingDongilStatus] =
    useState<TFetchStatus>('idle');
  const canDeletePendingDongil = deletePendingDongilStatus === 'idle';

  // 2. 제안중인 돈길 삭제
  async function handleDeleteButtonClick() {
    if (canDeletePendingDongil) {
      try {
        setDeletePendingDongilStatus('pending');
        await dispatch(
          deletePendingDongil({
            axiosPrivate,
            id,
          }),
        ).unwrap();
        openDeleteCheckSheet();
      } catch (error: any) {
        console.log(error);
      } finally {
        setDeletePendingDongilStatus('idle');
      }
    }
    openSheetBySequence(openDeleteCompletedSheet);
  }

  // 1. 정말로 삭제할거에요?
  const openDeleteCheckSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'delete',
        onMainActionClick: handleDeleteButtonClick,
        onDismiss: setCloseBottomSheet,
      },
    });
  };

  // 3. 삭제되었어요
  const openDeleteCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'delete',
      },
    });
  };

  const { openModal } = useModals();
  // 1-a. 제안중 모달
  function openQuinaryModal() {
    openModal(modals.receiptModal, {
      variant: 'proposing',
      createdAt,
      interestRate,
      isMom,
      itemName,
      title,
      totalPrice,
      weekPrice,
      weeks,
      fileName,
    });
  }

  // 1-b. 거절됨 모달
  function openSenaryModal() {
    openModal(modals.receiptModal, {
      variant: 'rejected',
      onSubmit: () => {
        openDeleteCheckSheet();
      },
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
    <StyledButton onClick={handleClick}>
      <div className="text-wrapper">
        <span className="title">{title}</span>
        <span className="createdAt">
          {getFormattedTimeStamp(createdAt, 'YYYY.MM.DD')}
        </span>
      </div>
      <ProposalBadge isProposing={challengeStatus === 'PENDING'} />
    </StyledButton>
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
