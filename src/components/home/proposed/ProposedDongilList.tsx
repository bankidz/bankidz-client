import { IDongil } from '@store/slices/walkingDongilSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PendingDongilItem from './ProposedDongilItem';

interface PendingDongilListProps {
  proposedDongils: IDongil[];
  // onDeleteCheckOpen?: () => void;
  // setIdToDelete?: Dispatch<SetStateAction<number | null>>;
}

function ProposedDongilList({
  proposedDongils,
}: // onDeleteCheckOpen,
// setIdToDelete,
PendingDongilListProps) {
  return (
    <Wrapper>
      {proposedDongils?.map((proposedDongil) => (
        <PendingDongilItem
          key={proposedDongil.id}
          proposedDongil={proposedDongil}
          // onDeleteCheckOpen={onDeleteCheckOpen}
          // setIdToDelete={setIdToDelete}
        />
      ))}
    </Wrapper>
  );
}

export default ProposedDongilList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
