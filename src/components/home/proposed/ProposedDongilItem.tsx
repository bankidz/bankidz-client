import InterestBadge from '@components/common/badges/InterestBadge';
import { modals } from '@components/common/modals/Modals';
import challengeAPI from '@lib/apis/challenge/challengeAPI';
import queryKeys from '@lib/constants/queryKeys';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useModals from '@lib/hooks/useModals';
import { EDayOfWeek } from '@lib/types/EDayOfWeek';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';
import React from 'react';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface ProposedDongilItemProps {
  proposedDongil: IChallengeDTO;
}

function ProposedDongilItem({ proposedDongil }: ProposedDongilItemProps) {
  const {
    id,
    createdAt,
    interestRate,
    isMom,
    itemName,
    title,
    totalPrice,
    weekPrice,
    weeks,
    fileName,
  } = proposedDongil;

  const { setOpenBottomSheet, setCloseBottomSheet, openSheetBySequence } =
    useGlobalBottomSheet();

  // 4. 자녀의 돈길이 수락되었어요
  const openApproveCompletedBottomSheet = () => {
    const openSheet = () =>
      setOpenBottomSheet({
        sheetContent: 'Completed',
        sheetProps: { open: true },
        contentProps: {
          type: 'approve',
          onMainActionClick: setCloseBottomSheet,
        },
      });
    openSheetBySequence(openSheet);
  };

  // 3. 자녀의 돈길 수락
  const queryClient = useQueryClient();
  const selectedKid = useAppSelector(selectSelectedKid);
  const approveMutation = useMutation(challengeAPI.patchChallenge, {
    onSuccess: () => {
      queryClient.invalidateQueries([
        queryKeys.CHALLENGE_KID,
        selectedKid?.kidId,
        'pending',
      ]);
      queryClient.invalidateQueries([
        queryKeys.CHALLENGE_KID,
        selectedKid?.kidId,
        'walking',
      ]);
      openApproveCompletedBottomSheet();
    },
  });
  const handleApproveButtonClick = async () => {
    approveMutation.mutate({ challengeId: id, accept: true, comment: '' });
  };

  // 2. 자녀의 돈길을 수락할까요?
  const openApproveCheckBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'approve',
        onMainActionClick: handleApproveButtonClick,
        onDismiss: setCloseBottomSheet,
      },
    });
  };

  // 1-a. 오늘은 뱅키즈 쉬는날
  const openNoticeSundayBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Notice',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'sunday',
      },
    });
  };

  // 1-b. 제안받은 돈길 모달
  const { openModal } = useModals();
  const navigate = useNavigate();
  const openProposedReceiptModal = () => {
    openModal(modals.receiptModal, {
      variant: 'proposed',
      onSubmit: () => {
        navigate(`/reject/${id}`);
      },
      onExtraSubmit: () => {
        openApproveCheckBottomSheet!();
      },
      createdAt,
      interestRate,
      itemName,
      title,
      totalPrice,
      weekPrice,
      weeks,
      fileName,
      isMom,
      shouldCloseOnOverlayClick: true,
    });
  };

  return (
    <StyledButton
      onClick={
        dayjs().day() === EDayOfWeek.SUNDAY
          ? openNoticeSundayBottomSheet
          : openProposedReceiptModal
      }
    >
      <div className="text-wrapper">
        <span className="title">{title}</span>
        <span className="totalPrice">
          {totalPrice.toLocaleString('ko-KR')}원
        </span>
      </div>
      <InterestBadge interestRate={interestRate} />
    </StyledButton>
  );
}

export default React.memo(ProposedDongilItem);

const StyledButton = styled.button`
  width: 100%;
  height: 75px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};

  margin-bottom: 8px;
  padding: 20px 16px 18px 16px;
  display: flex;
  justify-content: space-between;

  .text-wrapper {
    height: 37px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    .title {
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
    .totalPrice {
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      ${({ theme }) => theme.typo.button.Secondary_T_13_EB};
    }
  }
`;
