import styled from 'styled-components';
import { ReactComponent as BankiInterest10 } from '@assets/illusts/banki/banki_walk_10.svg';
import { ReactComponent as BankiInterest20 } from '@assets/illusts/banki/banki_walk_20.svg';
import { ReactComponent as BankiInterest30 } from '@assets/illusts/banki/banki_walk_30.svg';
import { TInterestRate } from '@lib/types/common';
import getCommaThreeDigits from '@lib/utils/kid/getCommaThreeDigits';

type TotalInterestProps = {
  interestRate: TInterestRate;
  totalPrice: number;
  successWeeks: number;
  weeks: number;
};

function TotalInterest({
  interestRate,
  totalPrice,
  successWeeks,
  weeks,
}: TotalInterestProps) {
  const BankiByInterest = {
    10: <BankiInterest10 />,
    20: <BankiInterest20 />,
    30: <BankiInterest30 />,
  };
  const weeklyInterest = (interestRate * totalPrice * 0.01) / weeks;
  return (
    <Wrapper>
      <Content>
        <p>1주마다 {getCommaThreeDigits(Math.ceil(weeklyInterest))}원</p>
        <div>
          <p>
            <span>{successWeeks}주</span> 걷기 성공해서
          </p>
          <p>
            이자가{' '}
            <span>
              {getCommaThreeDigits(Math.ceil(weeklyInterest * successWeeks))}원
            </span>{' '}
            쌓였어요
          </p>
        </div>
      </Content>
      <>{BankiByInterest[interestRate]}</>
    </Wrapper>
  );
}

export default TotalInterest;

const Wrapper = styled.div`
  height: 123px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
  padding: 24px 16px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  & > p {
    ${({ theme }) => theme.typo.text.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
  & > div {
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    & > p:last-child {
      margin-top: 10px;
    }
    span {
      color: ${({ theme }) => theme.palette.main.yellow400};
    }
  }
`;
