import React from 'react';
import styled from 'styled-components';
import ThisWeekSDongilItem from './ThisWeekSDongilItem';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';

interface ThisWeekSDongilListProps {
  thisWeekSDongils: IChallengeDTO[];
}

function ThisWeekSDongilList({ thisWeekSDongils }: ThisWeekSDongilListProps) {
  return (
    <Wrapper>
      {thisWeekSDongils?.map((thisWeekSDongil) => (
        <ThisWeekSDongilItem
          key={thisWeekSDongil.id}
          itemName={thisWeekSDongil.itemName}
          title={thisWeekSDongil.title}
          progressList={thisWeekSDongil.progressList}
          challengeStatus={thisWeekSDongil.challengeStatus}
          to={`/detail/${thisWeekSDongil.id}`}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(ThisWeekSDongilList);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
