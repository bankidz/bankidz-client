import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import React from 'react';
import styled from 'styled-components';
import PendingDongilItem from './PendingDongilItem';

interface PendingDongilListProps {
  pendingDongils: IChallengeDTO[];
}

function PendingDongilList({ pendingDongils }: PendingDongilListProps) {
  return (
    <Wrapper>
      {pendingDongils?.map((pendingDongil) => (
        <PendingDongilItem
          key={pendingDongil.id}
          pendingDongil={pendingDongil}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(PendingDongilList);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
