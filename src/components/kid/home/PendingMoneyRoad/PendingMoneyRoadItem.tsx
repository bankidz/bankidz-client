import SuggestBadge from '@components/common/badges/SuggestBadge';
import { TMoneyRoadStatus } from '@lib/types/kid';
import { getDate } from '@lib/utils/common/getDate';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PendingMoneyRoadItemProps {
  title: string | null;
  createdAt: string | null;
  status: TMoneyRoadStatus;
  to: string;
}

function PendingMoneyRoadItem({
  title,
  createdAt,
  status,
  to,
}: PendingMoneyRoadItemProps) {
  function handleClick() {
    console.log('click!');
  }
  return (
    <StyledButton onClick={handleClick}>
      <div className="text-wrapper">
        <span className="title">{title}</span>
        <span className="createdAt">{getDate(createdAt)}</span>
      </div>
      <SuggestBadgeWrapper>
        <SuggestBadge isSuggesting={status === 0 ? true : false} />
      </SuggestBadgeWrapper>
    </StyledButton>
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
