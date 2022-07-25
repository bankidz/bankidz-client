import { TMoneyRoadStatus } from '@lib/types/kid';
import { TWaitingMoneyRoadState } from '@store/slices/waitingMoneyRoadSlice';
import styled from 'styled-components';
import WaitingChallengeItem from './WaitingChallengeItem';

function WaitingMoneyRoadList({ waitingMoneyRoad }: TWaitingMoneyRoadState) {
  return (
    <Wrapper>
      {waitingMoneyRoad.map((waitingChallengeItem) => (
        <WaitingChallengeItem
          key={waitingChallengeItem.id}
          title={waitingChallengeItem.title}
          createdAt={waitingChallengeItem.createdAt}
          status={waitingChallengeItem.status as TMoneyRoadStatus}
        />
      ))}
    </Wrapper>
  );
}

export default WaitingMoneyRoadList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
