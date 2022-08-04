import OutlinedButton from '@components/common/buttons/OutlinedButton';
import { IFamilyState } from '@lib/types/kid';
import styled from 'styled-components';
import FamilyItem from './FamilyItem';

function FamilyList({ family }: { family: IFamilyState[] }) {
  return (
    <Wrapper>
      <List>
        {family.map((user) => (
          <FamilyItem user={user} key={user.username} />
        ))}
      </List>
      <OutlinedButton label="가족코드 공유하기" state={false} />
    </Wrapper>
  );
}

export default FamilyList;
const Wrapper = styled.div`
  & > button {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

const List = styled.div`
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.greyScale.grey200};
  }
  & > div:first-child {
    padding-top: 0px;
  }
`;
