import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import React from 'react';
import { modals } from '@components/atoms/modals/Modals';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useModals from '@lib/hooks/useModals';
import getFormattedTimeStamp from '@lib/utils/get/getFormattedTimeStamp';
import ProposalBadge from '@components/atoms/badges/ProposalBadge';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface PendingDongilItemProps {
  pendingDongil: IChallengeDTO;
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

  // 3. 삭제되었어요
  const openDeleteCompletedSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      contentProps: {
        type: 'delete',
      },
    });
  };

  // 2. 제안중인 돈길 삭제
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(challengeAPI.deleteChallenge, {
    onSuccess: () => {
      openDeleteCompletedSheet();
      queryClient.invalidateQueries([queryKeys.CHALLENGE, 'pending']);
    },
  });
  const handleDeleteButtonClick = () => {
    deleteMutation.mutate(id);
    openSheetBySequence(openDeleteCompletedSheet);
  };

  // 1. 정말로 삭제할거에요?
  const openDeleteCheckSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Warning',
      contentProps: {
        type: 'delete',
        onMainActionClick: handleDeleteButtonClick,
        onDismiss: setCloseBottomSheet,
      },
    });
  };

  // 1-a. 제안중 모달
  const { openModal } = useModals();
  const openQuinaryModal = () => {
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
      shouldCloseOnOverlayClick: true,
    });
  };

  // 1-b. 거절됨 모달
  const openSenaryModal = () => {
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
      shouldCloseOnOverlayClick: true,
    });
  };

  const handleClick = () => {
    if (challengeStatus === 'PENDING') {
      openQuinaryModal();
    } else if (challengeStatus === 'REJECTED') {
      openSenaryModal();
    }
  };

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

export default React.memo(PendingDongilItem);

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
