import styled from 'styled-components';
import { ReactComponent as SummaryWrapper } from '@assets/icons/homeKid-summary.svg';

interface SummaryProps {
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

function Summary({ current, goal, month, week }: SummaryProps) {
  // 일단은 크기 고정
  return (
    <Wrapper>
      <SummaryWrapper></SummaryWrapper>
      <Content>
        <p>
          {month}월 {week}주차
        </p>
        <InnerContent>
          <Count>
            <div>{current}원</div>
            <div>내 저금통</div>
          </Count>
          <Count>
            <div>{goal}원</div>
            <div>목표 저금액</div>
          </Count>
        </InnerContent>
      </Content>
    </Wrapper>
  );
}

export default Summary;

const Wrapper = styled.div`
  position: relative;
`;
const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 12px;
    font-weight: bold;
  }
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2px 0px;
  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.palette.gray[3]};
    padding-right: 50px;
  }
  &:last-child {
    padding-left: 50px;
  }
  div:first-child {
    font-size: 20px;
    line-height: 25px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.yellow[4]};
  }
  div:last-child {
    font-size: 12px;
    line-height: 15px;
  }
`;
