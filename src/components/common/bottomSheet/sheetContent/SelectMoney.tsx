import styled, { css } from 'styled-components';
import { ReactComponent as Money_500 } from '@assets/illust/selectMoney/money_500.svg';
import { ReactComponent as Money_1000 } from '@assets/illust/selectMoney/money_1000.svg';
import { ReactComponent as Money_5000 } from '@assets/illust/selectMoney/money_5000.svg';
import { ReactComponent as Money_10000 } from '@assets/illust/selectMoney/money_10000.svg';
import { ReactComponent as Money_50000 } from '@assets/illust/selectMoney/money_50000.svg';
import { ReactComponent as Backspace } from '@assets/icon/backspace.svg';
import { ReactComponent as Refresh } from '@assets/icon/refresh.svg';
import { calcRatio } from '@lib/styles/theme';
import { darken } from 'polished';

interface SelectMoneyProps {
  pushAmount: (amount: number) => void;
  popAmount: () => void;
  resetAmount: () => void;
}

function SelectMoney({ pushAmount, popAmount, resetAmount }: SelectMoneyProps) {
  return (
    <Wrapper>
      <ButtonContainer>
        <button
          onClick={() => {
            pushAmount(500);
          }}
        >
          <Money_500 />
        </button>
        <button
          onClick={() => {
            pushAmount(1000);
          }}
        >
          <Money_1000 />
        </button>
        <button
          onClick={() => {
            pushAmount(5000);
          }}
        >
          <Money_5000 />
        </button>
        <button
          onClick={() => {
            pushAmount(10000);
          }}
        >
          <Money_10000 />
        </button>
        <button
          onClick={() => {
            pushAmount(50000);
          }}
        >
          <Money_50000 />
        </button>
        <Remote>
          <button onClick={popAmount}>
            <Backspace />
          </button>
          <button onClick={resetAmount}>
            <Refresh />
          </button>
        </Remote>
      </ButtonContainer>
    </Wrapper>
  );
}

export default SelectMoney;

const Wrapper = styled.div`
  margin: 9px 16px 0px 16px;
`;

const ButtonContainer = styled.div`
  width: 292px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  button {
    height: 60px;
    &:active {
      transform: translateY(2px);
      transition: all 0.1s ease;
    }
  }
`;

const Remote = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  & > button {
    border-radius: 8px;
    ${({ theme }) => {
      const selected = theme.palette.greyScale.grey300;
      return css`
        background-color: ${selected};
        &:active {
          background-color: ${darken(0.1, selected)};
        }
      `;
    }}
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child > svg {
      padding-right: ${calcRatio(2, 61)};
    }
    & > svg {
      box-sizing: content-box;
    }
  }
`;
