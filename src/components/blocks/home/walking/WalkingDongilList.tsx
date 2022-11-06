import React from 'react';
import styled from 'styled-components';
import WalkingDongilItem from './WalkingDongilItem';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface WalkingDongilListProps {
  walkingDongils: IChallengeDTO[];
}

function WalkingDongilList({ walkingDongils }: WalkingDongilListProps) {
  return (
    <Wrapper>
      {walkingDongils?.map((walkingDongil) => (
        <WalkingDongilItem
          key={walkingDongil.id}
          itemName={walkingDongil.itemName}
          title={walkingDongil.title}
          id={walkingDongil.id}
          challengeStatus={walkingDongil.challengeStatus}
          interestRate={walkingDongil.interestRate}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(WalkingDongilList);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
