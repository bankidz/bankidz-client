import React from 'react';
import styled from 'styled-components';
import ProposedDongilItem from './ProposedDongilItem';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface ProposedDongilListProps {
  proposedDongils: IChallengeDTO[];
}

function ProposedDongilList({ proposedDongils }: ProposedDongilListProps) {
  return (
    <Wrapper>
      {proposedDongils?.map((proposedDongil) => (
        <ProposedDongilItem
          key={proposedDongil.id}
          proposedDongil={proposedDongil}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(ProposedDongilList);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
