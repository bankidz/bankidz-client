import { IDongil } from '@store/slices/walkingDongilSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PendingDongilItem from './SuggestedDongilItem';

interface PendingDongilListProps {
  suggestedDongils: IDongil[];
  // onDeleteCheckOpen?: () => void;
  // setIdToDelete?: Dispatch<SetStateAction<number | null>>;
}

function SuggestedDongilList({
  suggestedDongils,
}: // onDeleteCheckOpen,
// setIdToDelete,
PendingDongilListProps) {
  return (
    <Wrapper>
      {suggestedDongils?.map((suggestedDongil) => (
        <PendingDongilItem
          key={suggestedDongil.id}
          suggestedDongil={suggestedDongil}
          // onDeleteCheckOpen={onDeleteCheckOpen}
          // setIdToDelete={setIdToDelete}
        />
      ))}
    </Wrapper>
  );
}

export default SuggestedDongilList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
