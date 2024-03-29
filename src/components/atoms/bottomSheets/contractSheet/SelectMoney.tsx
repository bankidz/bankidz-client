import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { ReactComponent as Money_500 } from '@assets/illusts/selectMoney/money_500.svg';
import { ReactComponent as Money_1000 } from '@assets/illusts/selectMoney/money_1000.svg';
import { ReactComponent as Money_5000 } from '@assets/illusts/selectMoney/money_5000.svg';
import { ReactComponent as Money_10000 } from '@assets/illusts/selectMoney/money_10000.svg';
import { ReactComponent as Money_50000 } from '@assets/illusts/selectMoney/money_50000.svg';
import { ReactComponent as Backspace } from '@assets/icons/backspace.svg';
import { ReactComponent as Refresh } from '@assets/icons/refresh.svg';
import { calcRatio } from '@lib/styles/theme';

export interface SelectMoneyProps {
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
  margin-top: 9px;
`;

const ButtonContainer = styled.div`
  width: 292px;
  margin: 0px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  button {
    border-radius: 8px;
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
