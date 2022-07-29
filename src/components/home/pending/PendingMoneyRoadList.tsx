import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import styled from 'styled-components';
import PendingMoneyRoadItem from './PendingMoneyRoadItem';

interface PendingMoneyRoadListProps {
  pendingMoneyRoads: IMoneyRoad[];
  onDeleteCheckOpen: () => void;
}

function PendingMoneyRoadList({
  pendingMoneyRoads,
  onDeleteCheckOpen,
}: PendingMoneyRoadListProps) {
  return (
    <Wrapper>
      {pendingMoneyRoads?.map((pendingMoneyRoad) => (
        <PendingMoneyRoadItem
          key={pendingMoneyRoad.id}
          pendingMoneyRoad={pendingMoneyRoad}
          onDeleteCheckOpen={onDeleteCheckOpen}
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
