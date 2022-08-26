import { IDongil } from '@lib/types/IDongil';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PendingDongilItem from './PendingDongilItem';

interface PendingDongilListProps {
  pendingDongils: IDongil[];
  onWarningDeleteSheetOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingDongilList({
  pendingDongils,
  onWarningDeleteSheetOpen,
  setIdToDelete,
}: PendingDongilListProps) {
  return (
    <Wrapper>
      {pendingDongils?.map((pendingDongil) => (
        <PendingDongilItem
          key={pendingDongil.id}
          pendingDongil={pendingDongil}
          onWarningDeleteSheetOpen={onWarningDeleteSheetOpen}
          setIdToDelete={setIdToDelete}
        />
      ))}
    </Wrapper>
  );
}

export default PendingDongilList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
