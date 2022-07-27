import styled from 'styled-components';
import { ReactComponent as PlusCircle } from '@assets/icons/plus-circle.svg';
import { HTMLAttributes } from 'react';

interface EmptyWalkingMoneyRoadProps
  extends HTMLAttributes<HTMLButtonElement> {}

function EmptyWalkingMoneyRoad({ ...props }: EmptyWalkingMoneyRoadProps) {
  return (
    <Wrapper>
      <button {...props}>
        <PlusCircle />
      </button>
      <span>새로운 돈길 계약하기</span>
    </Wrapper>
  );
}

export default EmptyWalkingMoneyRoad;

const Wrapper = styled.div`
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
  }

  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;
