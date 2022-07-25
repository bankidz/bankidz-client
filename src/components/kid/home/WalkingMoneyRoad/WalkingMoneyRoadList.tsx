import { TItemName } from '@lib/types/kid';
import { TWalkingMoneyRoadState } from '@store/slices/walkingMoneyRoadSlice';
import styled from 'styled-components';
import WalkingChallengeItem from './WalkingChallengeItem';

function WalkingMoneyRoadList({ walkingMoneyRoad }: TWalkingMoneyRoadState) {
  return (
    <Wrapper>
      {walkingMoneyRoad.map((walkingChallengeItem) => (
        <WalkingChallengeItem
          key={walkingChallengeItem.id}
          itemName={walkingChallengeItem.targetItemName as TItemName}
          title={walkingChallengeItem.title}
        />
      ))}
    </Wrapper>
  );
}

export default WalkingMoneyRoadList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
