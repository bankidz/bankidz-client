import Button from '@components/common/buttons/Button';
import styled from 'styled-components';

function InterestToPayList() {
  return (
    <Wrapper>
      <Block>
        <div className="text-wrapper">
          <span className="date">2022.09.01 완주성공</span>
          <h1>기말고사 끝! 축하파티</h1>
          <div className="amount-wrapper">
            <span className="total-interest">총 이자</span>
            <span className="amount">3000원</span>
          </div>
        </div>

        <Button label="지급 완료하기" />
      </Block>
    </Wrapper>
  );
}

export default InterestToPayList;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 16px;

  width: 100%;
  height: 179px;
  border-radius: ${({ theme }) => theme.radius.large};
  background: ${({ theme }) => theme.palette.greyScale.white};

  .date {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-top: 8px;
  }
  h1 {
    width: 276px;
    height: 22px;
    ${({ theme }) => theme.typo.text.T_18_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-top: 4px;
  }
  .amount-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 24px;

    .total-interest {
      ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
      margin-right: 12px;
    }
    .amount {
      ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
      color: ${({ theme }) => theme.palette.greyScale.black};
    }
  }

  & + & {
    margin-top: 16px;
  }
`;
