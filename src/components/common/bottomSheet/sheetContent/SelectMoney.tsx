import styled from 'styled-components';

function SelectMoney() {
  return (
    <Wrapper>
      <ButtonContainer>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </ButtonContainer>
      <Sub>
        <button>직접 입력할래요</button>
      </Sub>
    </Wrapper>
  );
}

export default SelectMoney;

const Wrapper = styled.div`
  margin: 17px 16px 32px 16px;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;

  /* 임시 */
  & > div {
    height: 60px;
    background-color: gray;
    border-radius: 8px;
  }
`;

const Sub = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.gray[4]};
    text-decoration: underline;
  }
`;
