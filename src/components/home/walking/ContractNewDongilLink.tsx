import { ReactComponent as Plus } from '@assets/icons/plus.svg';
import { theme } from '@lib/styles/theme';
import { useAppSelector } from '@store/app/hooks';
import { selectWalkingDongils } from '@store/slices/walkingDongilsSlice';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ContractNewDongilLinkProps {
  to: string;
}

function ContractNewDongilLink({ to }: ContractNewDongilLinkProps) {
  const walkingDongils = useAppSelector(selectWalkingDongils);
  let disable = false;
  if (walkingDongils.length === 5) {
    disable = true;
  }

  const content = (
    <>
      <Plus
        stroke={
          disable
            ? theme.palette.greyScale.grey200
            : theme.palette.main.yellow400
        }
      />
      새로운 돈길 계약하기
    </>
  );

  return (
    <>
      {disable ? (
        <StyledDiv>{content}</StyledDiv>
      ) : (
        <StyledLink to={to}>{content}</StyledLink>
      )}
    </>
  );
}

export default ContractNewDongilLink;

const commonStyle = css`
  ${({ theme }) => theme.typo.button.Text_T_14_EB};
  width: 150px;
  height: 48px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  line-height: 16px;
  padding-left: 20px;

  position: relative;
  svg {
    position: absolute;
    transform: translate3d(0, -50%, 0);
    left: 0;
    top: 50%;
  }
`;

const StyledDiv = styled.div`
  color: ${({ theme }) => theme.palette.greyScale.grey200};
  ${commonStyle};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.main.yellow400};
  ${commonStyle};
`;

// https://mygumi.tistory.com/382
// https://bobbyhadz.com/blog/react-disable-link
