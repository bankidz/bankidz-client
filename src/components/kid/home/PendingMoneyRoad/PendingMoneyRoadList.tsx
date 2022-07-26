import { TMoneyRoadStatus } from '@lib/types/kid';
import { TPendingMoneyRoadsState } from '@store/slices/pendingMoneyRoadsSlice';
import styled from 'styled-components';
import PendingMoneyRoadItem from './PendingMoneyRoadItem';

function PendingMoneyRoadList({ pendingMoneyRoads }: TPendingMoneyRoadsState) {
  return (
    <Wrapper>
      {pendingMoneyRoads!.map((pendingMoneyRoad) => (
        <PendingMoneyRoadItem
          key={pendingMoneyRoad.id}
          title={pendingMoneyRoad.title}
          createdAt={pendingMoneyRoad.createdAt}
          status={pendingMoneyRoad.status as TMoneyRoadStatus}
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
