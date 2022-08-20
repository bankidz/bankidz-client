import { IDongil } from '@lib/types/IDongil';
import { TItemName } from '@lib/types/TItemName';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ThisWeekSDongilItem from './ThisWeekSDongilItem';

interface ThisWeekSDongilListProps {
  thisWeekSDongils: IDongil[];
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
          to={`/detail/${thisWeekSDongil.id}`}
        />
      ))}
    </Wrapper>
  );
}

export default ThisWeekSDongilList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
