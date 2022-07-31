import { ReactComponent as Fail } from '@assets/illusts/pigCoin/pigcoin_fail.svg';
import { ReactComponent as None } from '@assets/illusts/pigCoin/pigcoin_none.svg';
import { ReactComponent as Success } from '@assets/illusts/pigCoin/pigcoin_success.svg';
import styled from 'styled-components';

type TStempTypes = { challengeId: number; weeks: number; isAchieved: boolean };

interface InterestStampProps {
  weeks: number;
  stemp: TStempTypes[];
}
function InterestStampList({ weeks, stemp }: InterestStampProps) {
  return (
    <Wrapper>
      {stemp.map((v, i) => (
        <Stemp>
          {v.isAchieved ? <Success /> : <Fail />}
          <p>{i + 1}주차</p>
        </Stemp>
      ))}
      {[...new Array(weeks - stemp.length)].map((v, i) => (
        <Stemp>
          <None />
          <p>{i + stemp.length + 1}주차</p>
        </Stemp>
      ))}
    </Wrapper>
  );
}

export default InterestStampList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 16px 17px;
  padding: 0px 8px;
`;

const Stemp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  & > p {
    ${({ theme }) => theme.typo.text.S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;
