import styled from 'styled-components';
import { ReactComponent as BankiSad } from '@assets/illust/banki/banki_sad.svg';

function EmptyPendingMoneyRoad() {
  return (
    <Wrapper>
      <button>
        <BankiSad />
      </button>
      <span>대기중인 돈길이 없어요</span>
    </Wrapper>
  );
}

export default EmptyPendingMoneyRoad;

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
  }

  span {
    margin-top: 16px;
    ${({ theme }) => theme.typo.fixed.EmptyText_S_16_M};
    color: ${({ theme }) => theme.palette.greyScale.grey600};
  }
`;
