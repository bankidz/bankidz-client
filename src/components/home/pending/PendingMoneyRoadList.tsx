import { IMoneyRoad } from '@store/slices/walkingMoneyRoadsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PendingMoneyRoadItem from './PendingMoneyRoadItem';

interface PendingMoneyRoadListProps {
  pendingMoneyRoads: IMoneyRoad[];
  onDeleteCheckOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingMoneyRoadList({
  pendingMoneyRoads,
  onDeleteCheckOpen,
  setIdToDelete,
}: PendingMoneyRoadListProps) {
  return (
    <Wrapper>
      {pendingMoneyRoads?.map((pendingMoneyRoad) => (
        <PendingMoneyRoadItem
          key={pendingMoneyRoad.id}
          pendingMoneyRoad={pendingMoneyRoad}
          onDeleteCheckOpen={onDeleteCheckOpen}
          setIdToDelete={setIdToDelete}
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
