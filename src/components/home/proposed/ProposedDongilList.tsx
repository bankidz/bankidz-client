import { IDongil } from '@store/slices/walkingDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import PendingDongilItem from './ProposedDongilItem';

interface PendingDongilListProps {
  proposedDongils: IDongil[];
  onApproveCheckOpen: () => void;
  setIdToApprove: Dispatch<SetStateAction<number | null>>;
}

function ProposedDongilList({
  proposedDongils,
  onApproveCheckOpen,
  setIdToApprove,
}: PendingDongilListProps) {
  return (
    <Wrapper>
      {proposedDongils?.map((proposedDongil) => (
        <PendingDongilItem
          key={proposedDongil.id}
          proposedDongil={proposedDongil}
          onApproveCheckOpen={onApproveCheckOpen}
          setIdToApprove={setIdToApprove}
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
