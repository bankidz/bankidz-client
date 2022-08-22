import { calcRatio } from '@lib/styles/theme';
import { TInterestRate } from '@lib/types/IInterestRate';
import styled from 'styled-components';

interface SecondRowProps {
  totalPrice: number;
  weekPrice: number;
  interestRate: TInterestRate;
}

function getSecondRow({ totalPrice, weekPrice, interestRate }: SecondRowProps) {
  return (
    <Wrapper>
      <div className="목표저금액">
        <div className="title">목표 저금액</div>
        <div className="content">{totalPrice.toLocaleString('ko-KR')}</div>
      </div>
      <div className="매주저금액">
        <div className="title">매주 저금액</div>
        <div className="content">{weekPrice.toLocaleString('ko-KR')}</div>
      </div>
      <div className="이자부스터">
        <div className="title">이자부스터</div>
        <div className="content">{interestRate}%</div>
      </div>
    </Wrapper>
  );
}

export default getSecondRow;

const Wrapper = styled.div`
  width: 100%;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 33.3%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: ${calcRatio(24, 324)};
    .title {
      width: 100%;
      height: 12px;
      margin-top: 0;
      margin-bottom: 8px;
      ${({ theme }) => theme.typo.text.S_12_M};
      color: ${({ theme }) => theme.palette.greyScale.grey500};
    }
    .content {
      width: 100%;
      height: 16px;
      ${({ theme }) => theme.typo.text.T_16_EB};
      color: ${({ theme }) => theme.palette.greyScale.grey700};
    }
  }
`;
