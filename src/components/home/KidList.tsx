import { IKid } from '@store/slices/kidsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface KidListProps {
  kids: IKid[];
  selectedKid: IKid;
  setSelectedKid: Dispatch<SetStateAction<IKid | null>>;
}

function KidList({ kids, selectedKid, setSelectedKid }: KidListProps) {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };
  return (
    <Wrapper>
      {kids?.map((kid) => (
        <UsernameButton
          onClick={() => {
            setSelectedKid(kid);
          }}
          key={kid.username}
          className={kid === selectedKid ? 'active' : undefined}
        >
          {kid.username}
          {/* TODO: underline 따로 svg export 필요함. 피그마상에서 export 불가능하여 디자인팀에게 부탁한 상태임. */}
          {kid === selectedKid && <Border>---</Border>}
        </UsernameButton>
      ))}
    </Wrapper>
  );
}

export default KidList;

const Wrapper = styled.div`
  margin-top: 38px;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const UsernameButton = styled.button`
  ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey700};

  & + & {
    margin-left: 8px;
  }
  &.active {
    transition: 0.125s all ease-in;
  }
  .border {
  }
`;

const Border = styled.div``;

// https://codepen.io/chaoticpotato/pen/vELNrG
