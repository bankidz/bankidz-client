import { IKid } from '@store/slices/kidsSlice';
import styled from 'styled-components';

interface KidListProps {
  kids: IKid[];
}

function KidList({ kids }: KidListProps) {
  return (
    <Wrapper>
      {kids?.map((kid) => (
        <span key={kid.username}>{kid.username}</span>
      ))}
    </Wrapper>
  );
}

export default KidList;

const Wrapper = styled.div`
  margin-top: 38.44;
  background: pink;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.grey700};
    & + & {
      margin-right: 8px;
    }
  }
`;
