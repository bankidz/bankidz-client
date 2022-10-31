import styled from 'styled-components';
import { useQuery } from 'react-query';
import { ReactComponent as UsernameUnderline } from '@assets/borders/username-underline.svg';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { selectSelectedKid, setSelectedKid } from '@store/slices/kidsSlice';
import useLevel from '@lib/hooks/useLevel';
import getColorByLevel from '@lib/utils/get/getColorByLevel';
import queryKeys from '@lib/constants/queryKeys';
import { IKidListDTO } from '@lib/apis/family/familyDTO';
import familyAPI from '@lib/apis/family/familyAPI';

function KidList() {
  const dispatch = useAppDispatch();
  const selectedKid = useAppSelector(selectSelectedKid);
  const isSelectedKid = (kid: IKidListDTO) => kid === selectedKid;
  const level = useLevel();
  const colorByLevel = getColorByLevel(level);

  const { status, data: kids } = useQuery(
    queryKeys.FAMILY_KID,
    familyAPI.getKid,
  );

  return (
    <Wrapper colorByLevel={colorByLevel}>
      <FlexContainer>
        {status === 'success' &&
          kids?.map((kid) => (
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
      </FlexContainer>
    </Wrapper>
  );
}

export default KidList;

const Wrapper = styled.div<{ colorByLevel: string }>`
  margin-top: 38.44px;
  width: 250px;
  height: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  z-index: 3;
  width: 100%;
`;

const FlexContainer = styled.div`
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
