import InterestBadge from '@components/common/badges/InterestBadge';
import { modals } from '@components/common/modals/Modals';
import useModals from '@lib/hooks/useModals';
import { IDongil } from '@lib/types/IDongil';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ProposedDongilItemProps {
  proposedDongil: IDongil;
  onApproveCheckOpen?: () => void;
  setIdToApprove?: Dispatch<SetStateAction<number | null>>;
}

function ProposedDongilItem({
  proposedDongil,
  onApproveCheckOpen,
  setIdToApprove,
}: ProposedDongilItemProps) {
  const { openModal } = useModals();
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

  const navigate = useNavigate();
  function openProposedReceiptModal() {
    openModal(modals.receiptModal, {
      variant: 'proposed',
      onSubmit: () => {
        navigate(`/reject/${id}`);
      },
      onExtraSubmit: () => {
        setIdToApprove!(id);
        onApproveCheckOpen!();
      },
      isKid: false,
      createdAt: createdAt,
      interestRate: interestRate,
      isMom: isMom,
      itemName: itemName,
      title: title,
      totalPrice: totalPrice,
      weekPrice: weekPrice,
      weeks: weeks,
      filename: 'dummy',
      shouldCloseOnOverlayClick: true,
    });
  }

  return (
    <StyledButton onClick={openProposedReceiptModal}>
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
