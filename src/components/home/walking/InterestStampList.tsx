import { ReactComponent as Fail } from '@assets/illusts/pigCoin/pigcoin_fail.svg';
import { ReactComponent as None } from '@assets/illusts/pigCoin/pigcoin_none.svg';
import { ReactComponent as Success } from '@assets/illusts/pigCoin/pigcoin_success.svg';
import styled from 'styled-components';

interface IStamp {
  challengeId: number;
  weeks: number;
  isAchieved: boolean;
}

interface InterestStampProps {
  weeks: number;
  stamps: IStamp[];
}
function InterestStampList({ weeks, stamps }: InterestStampProps) {
  return (
    <Wrapper>
      {stamps.map((v, i) => (
        <StampItem key={`${v.challengeId}${i + 1}`}>
          {v.isAchieved ? <Success /> : <Fail />}
          <p>{i + 1}주차</p>
        </StampItem>
      ))}
      {[...new Array(weeks - stamps.length)].map((v, i) => (
        <StampItem key={`${i + stamps.length + 1}`}>
          <None />
          <p>{i + stamps.length + 1}주차</p>
        </StampItem>
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

const StampItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  & > p {
    ${({ theme }) => theme.typo.text.S_12_M}
    color: ${({ theme }) => theme.palette.greyScale.grey500}
  }
`;
