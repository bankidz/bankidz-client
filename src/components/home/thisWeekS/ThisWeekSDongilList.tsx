import { TItemName } from '@lib/types/kid';
import { IDongil } from '@store/slices/walkingDongilSlice';
import styled from 'styled-components';
import ThisWeekSDongilItem from './ThisWeekSDongilItem';

function ThisWeekSDongilList({
  thisWeekSDongils,
}: {
  thisWeekSDongils: IDongil[];
}) {
  return (
    <Wrapper>
      {thisWeekSDongils?.map((thisWeekSDongil) => (
        <ThisWeekSDongilItem
          key={thisWeekSDongil.id}
          itemName={thisWeekSDongil.itemName as TItemName}
          title={thisWeekSDongil.title}
          status={thisWeekSDongil.status}
          to={`/walking/${thisWeekSDongil.id}`}
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
