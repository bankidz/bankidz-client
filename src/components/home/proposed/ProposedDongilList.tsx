import { IDongil } from '@lib/types/IDongil';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ProposedDongilItem from './ProposedDongilItem';

interface ProposedDongilListProps {
  proposedDongils: IDongil[];
  onApproveCheckOpen: () => void;
  setIdToApprove: Dispatch<SetStateAction<number>>;
}

function ProposedDongilList({
  proposedDongils,
  onApproveCheckOpen,
  setIdToApprove,
}: ProposedDongilListProps) {
  return (
    <Wrapper>
      {proposedDongils?.map((proposedDongil) => (
        <ProposedDongilItem
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
