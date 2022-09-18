import styled from 'styled-components';
import { ReactComponent as PlusCircle } from '@assets/icons/plus-circle.svg';
import { HTMLAttributes } from 'react';

interface EmptyWalkingDongilProps extends HTMLAttributes<HTMLButtonElement> {
  createDisabled: boolean;
}

function EmptyWalkingDongil({
  createDisabled,
  ...props
}: EmptyWalkingDongilProps) {
  return (
    <Wrapper createDisabled={createDisabled}>
      <button disabled={createDisabled} {...props}>
        <PlusCircle />
      </button>
      <span>새로운 돈길 계약하기</span>
    </Wrapper>
  );
}

export default EmptyWalkingDongil;

const Wrapper = styled.div<{ createDisabled: boolean }>`
  width: 100%;
  height: 162px;
  border-radius: ${({ theme }) => theme.radius.medium};
  background: ${({ theme }) => theme.palette.greyScale.white};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    svg {
      fill: ${({ createDisabled, theme }) =>
        createDisabled
          ? theme.palette.greyScale.grey300
          : theme.palette.main.yellow300};
    }
  }
  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ createDisabled, theme }) =>
      createDisabled
        ? theme.palette.greyScale.grey600
        : theme.palette.greyScale.black};
  }
`;
