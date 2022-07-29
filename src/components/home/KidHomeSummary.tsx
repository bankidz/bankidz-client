import styled from 'styled-components';

interface KidHomeSummaryProps {
  /**
   * 내 저금통
   */
  current: number;
  /**
   * 목표 저금액
   */
  goal: number;
  /**
   * m월
   */
  month: number;
  /**
   *  n주차
   */
  week: number;
}

function KidHomeSummary({ current, goal, month, week }: KidHomeSummaryProps) {
  // 일단은 크기 고정
  return (
    <Wrapper>
      <p>
        {month}월 {week}주차
      </p>
      <InnerContent>
        <Count>
          <div>{current}원</div>
          <div>내 저금통</div>
        </Count>
        <Divider />
        <Count>
          <div>{goal}원</div>
          <div>목표 저금액</div>
        </Count>
      </InnerContent>
    </Wrapper>
  );
}

export default KidHomeSummary;

const Wrapper = styled.div`
  height: 120px;
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  display: flex;
  border-radius: ${({ theme }) => theme.radius.large};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 25px 0px;
  & > p {
    ${({ theme }) => theme.typo.text.T_14_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;
const InnerContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  grid-template-columns: 1fr 2px 1fr;
  margin-top: 12px;
`;

const Count = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2px 0px;
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
