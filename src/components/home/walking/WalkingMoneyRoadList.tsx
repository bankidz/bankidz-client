import { TItemName } from '@lib/types/kid';
import { TWalkingMoneyRoadsState } from '@store/slices/walkingMoneyRoadsSlice';
import styled from 'styled-components';
import WalkingMoneyRoadItem from './WalkingMoneyRoadItem';

function WalkingMoneyRoadList({ walkingMoneyRoads }: TWalkingMoneyRoadsState) {
  return (
    <Wrapper>
      {walkingMoneyRoads?.map((walkingMoneyRoad) => (
        <WalkingMoneyRoadItem
          key={walkingMoneyRoad.id}
          itemName={walkingMoneyRoad.itemName as TItemName}
          title={walkingMoneyRoad.title}
          to={`/walking/${walkingMoneyRoad.id}`}
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
