import styled from 'styled-components';

interface WalkingSummaryProps {
  currentSavings: number;
  totalPrice: number;
}

function WalkingSummary({ currentSavings, totalPrice }: WalkingSummaryProps) {
  const currentCompletionRate = Math.round((currentSavings / totalPrice) * 100);
  return (
    <Wrapper>
      <Content>
        <TextWrapper>
          <div>{currentSavings.toLocaleString('ko-KR')}원</div>
          <div>내 저금통</div>
        </TextWrapper>
        <Divider />
        <TextWrapper>
          <div>{currentCompletionRate}%</div>
          <div>현재 완주율</div>
        </TextWrapper>
      </Content>
    </Wrapper>
  );
}

export default WalkingSummary;

const Wrapper = styled.div`
  height: 89px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  border-radius: ${({ theme }) => theme.radius.large};
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey100};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 25px 0px;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  grid-template-columns: 1fr 2px 1fr;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div:first-child {
    ${({ theme }) => theme.typo.fixed.GraphNum_T_21_EB};
    color: ${({ theme }) => theme.palette.main.yellow400};
  }
  div:last-child {
    ${({ theme }) => theme.typo.fixed.GraphSub_S_12_M};
    color: ${({ theme }) => theme.palette.greyScale.grey500};
    margin-top: 8px;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 53px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.palette.greyScale.grey200};
`;
