import styled from 'styled-components';
import { ReactComponent as UsernameUnderline } from '@assets/borders/username-underline.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  selectKids,
  selectSelectedKid,
  setSelectedKid,
} from '@store/slices/kidsSlice';
import { IKid } from '@lib/types/IKid';

function KidList() {
  const dispatch = useAppDispatch();
  const kids = useAppSelector(selectKids);
  const selectedKid = useAppSelector(selectSelectedKid);
  const isSelectedKid = (kid: IKid) => kid === selectedKid;

  return (
    <Wrapper>
      {kids?.map((kid) => (
        <UsernameButton
          key={kid.kidId}
          onClick={() => {
            dispatch(setSelectedKid(kid));
          }}
          className={isSelectedKid(kid) ? 'active' : undefined}
        >
          {kid.username}
          {isSelectedKid(kid) && (
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
    transition: ${({ theme }) => theme.transition.kidSelect};
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
