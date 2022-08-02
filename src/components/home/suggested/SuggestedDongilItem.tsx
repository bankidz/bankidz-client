import InterestBadge from '@components/common/badges/InterestBadge';
import { modals } from '@components/common/modals/Modals';
import useModals from '@lib/hooks/useModals';
import { IDongil } from '@store/slices/walkingDongilSlice';
import styled from 'styled-components';

interface SuggestedDongilItemProps {
  suggestedDongil: IDongil;
  // onDeleteCheckOpen: () => void;
  // setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function SuggestedDongilItem({
  suggestedDongil,
}: // onDeleteCheckOpen,
// setIdToDelete,
SuggestedDongilItemProps) {
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
  } = suggestedDongil;

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
  // function openSenaryModal() {
  //   openModal(modals.senaryModal, {
  //     onSubmit: () => {
  //       onDeleteCheckOpen();
  //       setIdToDelete(id);
  //     },
  //     createdAt: createdAt,
  //     interestRate: interestRate,
  //     isMom: isMom,
  //     itemName: itemName,
  //     title: title,
  //     totalPrice: totalPrice,
  //     weekPrice: weekPrice,
  //     weeks: weeks,
  //     comment: comment?.content,
  //   });
  // }

  function handleClick() {
    // if (status === EDongilStatus.PENDING) {
    //   openQuinaryModal();
    // } else if (status === EDongilStatus.REJECTED) {
    //   openSenaryModal();
    // }
  }

  return (
    <>
      <StyledButton onClick={handleClick}>
        <div className="text-wrapper">
          <span className="title">{title}</span>
          <span className="totalPrice">
            {totalPrice.toLocaleString('ko-KR')}원
          </span>
        </div>
        <InterestBadgeWrapper>
          <InterestBadge interestRate={interestRate} />
        </InterestBadgeWrapper>
      </StyledButton>
    </>
  );
}

export default SuggestedDongilItem;

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
      margin-bottom: 10px;
      ${({ theme }) => theme.typo.button.Title_T_14_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }

    .totalPrice {
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      /* TODO: type 시스템 미적용 */
      font-family: 'Tmoney RoundWind';
      font-style: normal;
      font-weight: 800;
      font-size: 13px;
    }
  }
`;

const InterestBadgeWrapper = styled.div`
  margin-right: 16px;
`;
