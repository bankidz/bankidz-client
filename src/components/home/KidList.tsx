import { IKid } from '@store/slices/familySlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as UsernameUnderline } from '@assets/borders/username-underline.svg';

interface KidListProps {
  kids: IKid[];
  selectedKid: IKid;
  setSelectedKid: Dispatch<SetStateAction<IKid | null>>;
}

function KidList({ kids, selectedKid, setSelectedKid }: KidListProps) {
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
          {kid === selectedKid && (
            <div className="username-underline-wrapper">
              <UsernameUnderline />
            </div>
          )}
        </UsernameButton>
      ))}
    </Wrapper>
  );
}

export default KidList;

const Wrapper = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 16px;
  margin-top: 38.44px;
`;

const UsernameButton = styled.button`
  ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
  color: ${({ theme }) => theme.palette.greyScale.grey100};
  & + & {
    margin-left: 8px;
  }
  &.active {
    transition: ${({ theme }) => theme.transition.onFocus};
    color: ${({ theme }) => theme.palette.greyScale.grey700};
  }
  .username-underline-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
  }
`;

// https://codepen.io/chaoticpotato/pen/vELNrG
