import SuggestBadge from '@components/common/badges/SuggestBadge';
import { TMoneyRoadStatus } from '@lib/types/kid';
import { getDate } from '@lib/utils/common/getDate';
import styled from 'styled-components';

interface ChallengeItemProps {
  title: string | null;
  createdAt: string | null;
  status: TMoneyRoadStatus;
}

function ChallengeItem({ title, createdAt, status }: ChallengeItemProps) {
  return (
    <Wrapper>
      <div className="text-wrapper">
        <span className="title">{title}</span>
        <span className="createdAt">{getDate(createdAt)}</span>
      </div>
      <SuggestBadgeWrapper>
        <SuggestBadge isSuggesting={status === 0 ? true : false} />
      </SuggestBadgeWrapper>
    </Wrapper>
  );
}

export default ChallengeItem;

const Wrapper = styled.div`
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
