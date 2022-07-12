import styled from 'styled-components';
import money_500 from '@assets/illust/SelectMoney/money_500.svg';
import money_1000 from '@assets/illust/SelectMoney/money_1000.svg';
import money_5000 from '@assets/illust/SelectMoney/money_5000.svg';
import money_10000 from '@assets/illust/SelectMoney/money_10000.svg';
import money_50000 from '@assets/illust/SelectMoney/money_50000.svg';

function SelectMoney() {
  return (
    <Wrapper>
      <ButtonContainer>
        <button>
          <img src={money_500} />
        </button>
        <button>
          <img src={money_1000} />
        </button>

        <button>
          <img src={money_5000} />
        </button>
        <button>
          <img src={money_10000} />
        </button>

        <button>
          <img src={money_50000} />
        </button>
        <Remote>
          <button></button>
          <button></button>
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
  & > button {
    height: 60px;
  }
`;

const Remote = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  & > button {
    border-radius: 8px;
    background-color: #dbdee1;
  }
`;
