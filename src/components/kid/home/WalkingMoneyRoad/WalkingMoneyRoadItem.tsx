import { TItemName } from '@lib/types/kid';
import { renderItemIllust } from '@lib/utils/common/renderItemIllust';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface WalkingMoneyRoadItemProps {
  itemName: TItemName;
  title: string | null;
  to: any;
}

function WalkingMoneyRoadItem({
  itemName,
  title,
  to,
}: WalkingMoneyRoadItemProps) {
  return (
    <Wrapper to={to}>
      <div>{renderItemIllust(itemName)}</div>
      <span>{title}</span>
    </Wrapper>
  );
}

// function Button(props: any) {
//   return props.to ? (
//     <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
//   ) : (
//     <StyledButton {...props} />
//   );
// }
// export default Button;

export default WalkingMoneyRoadItem;

const Wrapper = styled(Link)`
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
