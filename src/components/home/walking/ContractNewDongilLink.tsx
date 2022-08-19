import { ReactComponent as Plus } from '@assets/icons/plus.svg';
import { theme } from '@lib/styles/theme';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ContractNewDongilLinkProps {
  disable: 'true' | 'false';
  to: string;
}

function ContractNewDongilLink({ disable, to }: ContractNewDongilLinkProps) {
  return (
    // TODO: disable 처리
    // https://bobbyhadz.com/blog/react-disable-link
    <StyledLink disable={disable} to={to}>
      <Plus
        stroke={
          disable === 'true'
            ? theme.palette.greyScale.grey200
            : theme.palette.main.yellow400
        }
      />
      새로운 돈길 계약하기
    </StyledLink>
  );
}

export default ContractNewDongilLink;

const StyledLink = styled(Link)<{ disable: string }>`
  ${({ theme }) => theme.typo.button.Text_T_14_EB};
  color: ${({ disable, theme }) =>
    disable === 'true'
      ? `${theme.palette.greyScale.grey200}`
      : `${theme.palette.main.yellow400}`};

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

// https://mygumi.tistory.com/382
