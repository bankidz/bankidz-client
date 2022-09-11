import { ReactComponent as Plus } from '@assets/icons/plus.svg';
import { useAppSelector } from '@store/app/hooks';
import { selectWalkingDongils } from '@store/slices/walkingDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface ContractNewDongilLinkProps {
  to: string;
  createDisabled: boolean;
  navigateCreateDongil: () => void;
}

function ContractNewDongilLink({
  to,
  createDisabled,
  navigateCreateDongil,
}: ContractNewDongilLinkProps) {
  return (
    <StyledDiv onClick={navigateCreateDongil} createDisabled={createDisabled}>
      <Plus />
      새로운 돈길 계약하기
    </StyledDiv>
  );
}

export default ContractNewDongilLink;

const StyledDiv = styled.div<{ createDisabled: boolean }>`
  cursor: pointer;
  color: ${({ theme, createDisabled }) =>
    createDisabled
      ? theme.palette.greyScale.grey200
      : theme.palette.main.yellow400};

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
    stroke: ${({ createDisabled, theme }) =>
      createDisabled
        ? theme.palette.greyScale.grey200
        : theme.palette.main.yellow400};
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.main.yellow400};
`;

// https://mygumi.tistory.com/382
// https://bobbyhadz.com/blog/react-disable-link
