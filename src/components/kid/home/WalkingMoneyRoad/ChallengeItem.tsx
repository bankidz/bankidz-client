import { calcRatio } from '@lib/styles/theme';
import { TItemName } from '@lib/types/kid';
import { renderItemIllust } from '@lib/utils/kid';
import styled, { ThemeContext } from 'styled-components';

interface ChallengeItemProps {
  itemName: TItemName;
  title: string;
}

function ChallengeItem({ itemName, title }: ChallengeItemProps) {
  return (
    <Wrapper>
      <div className="Illust-wrapper">{renderItemIllust(itemName)}</div>
      <span className="body">{title}</span>
    </Wrapper>
  );
}

export default ChallengeItem;

const Wrapper = styled.div`
  width: 100%;
  height: 54px;
  background: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.medium};
  margin-bottom: 8px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    width: 30px;
    margin-left: 16px;
  }

  span {
    margin-left: 12px;
    ${({ theme }) => theme.typo.button.Title_T_14_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
