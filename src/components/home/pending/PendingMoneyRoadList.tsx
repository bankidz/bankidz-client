import { TPendingMoneyRoadsState } from '@store/slices/pendingMoneyRoadsSlice';
import styled from 'styled-components';
import PendingMoneyRoadItem from './PendingMoneyRoadItem';

function PendingMoneyRoadList({ pendingMoneyRoads }: TPendingMoneyRoadsState) {
  return (
    <Wrapper>
      {pendingMoneyRoads!.map((pendingMoneyRoad) => (
        <PendingMoneyRoadItem
          key={pendingMoneyRoad.id}
          pendingMoneyRoad={pendingMoneyRoad}
        />
      ))}
    </Wrapper>
  );
}

export default PendingMoneyRoadList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
