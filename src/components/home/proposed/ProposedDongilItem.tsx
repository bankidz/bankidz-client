import InterestBadge from '@components/common/badges/InterestBadge';
import { modals } from '@components/common/modals/Modals';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import useModals from '@lib/hooks/useModals';
import { IDongil } from '@lib/types/IDongil';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  approveProposedDongil,
  selectProposedDongils,
} from '@store/slices/proposedDongilsSlice';
import { appendThisWeekSDongil } from '@store/slices/thisWeekSDongilsSlice';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ProposedDongilItemProps {
  proposedDongil: IDongil;
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

  const {
    isOpen,
    setOpenBottomSheet,
    setCloseBottomSheet,
    openSheetBySequence,
  } = useGlobalBottomSheet();

  const selectedKid = useAppSelector(selectSelectedKid);
  const proposedDongils = useAppSelector(selectProposedDongils);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [approveProposedDongilStatus, setApproveProposedDongilStatus] =
    useState<TFetchStatus>('idle');
  const canApproveProposedDongil =
    approveProposedDongilStatus === 'idle' && selectedKid !== null;

  // 3. 제안받은 돈길 수락
  async function handleApproveButtonClick() {
    console.log('asdf');
    if (canApproveProposedDongil) {
      try {
        setApproveProposedDongilStatus('pending');
        await dispatch(
          approveProposedDongil({
            axiosPrivate,
            id,
            isApprove: true,
          }),
        ).unwrap();

        const getApprovedDongil = (id: number) => {
          let found;
          proposedDongils.map((proposedDongil) => {
            found = proposedDongil.challengeList.find(
              (challenge) => challenge.id === id,
            );
          });
          return found;
        };
        const approvedDongil = getApprovedDongil(id)!;
        dispatch(appendThisWeekSDongil({ selectedKid, approvedDongil }));
        openApproveCompletedBottomSheet();
      } catch (error) {
        console.log(error);
      } finally {
        setApproveProposedDongilStatus('idle');
      }
    }
  }

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

  // 1. 제안받은 돈길 모달
  const { openModal } = useModals();
  const navigate = useNavigate();

  function openProposedReceiptModal() {
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
  }

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

  const currentDayOfWeek = dayjs().day();

  return (
    <StyledButton
      onClick={
        // 7: Sunday
        currentDayOfWeek === 7
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

export default ProposedDongilItem;

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
