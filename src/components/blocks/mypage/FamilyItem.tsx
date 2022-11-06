import styled from 'styled-components';
import renderMypageRoleIllust from '@lib/utils/render/renderMypageRoleIllust';
import getRoleText from '@lib/utils/get/getRoleText';
import { IFamilyUserDTO } from '@lib/apis/family/familyDTO';

interface FamilyItemProps {
  user: IFamilyUserDTO;
  me?: boolean;
}

function FamilyItem({ user, me = false }: FamilyItemProps) {
  const { isFemale, isKid, username } = user;
  return (
    <Wrapper>
      <div>
        {renderMypageRoleIllust(isKid, isFemale)}
        <p>{username}</p>
      </div>
      <div>{me ? '나' : getRoleText(isKid, isFemale)}</div>
    </Wrapper>
  );
}

export default FamilyItem;

const Wrapper = styled.div`
  padding: 12px;
  height: 50px;
  box-sizing: content-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div:first-child {
    display: flex;
    align-items: center;
    svg {
    }
    p {
      ${({ theme }) => theme.typo.text.T_16_EB}
      color: ${({ theme }) => theme.palette.greyScale.black};
      margin-left: 16px;
    }
  }
  & > div:last-child {
    ${({ theme }) => theme.typo.tag.T_12_EB}
    color: ${({ theme }) => theme.palette.greyScale.grey600};
    background-color: ${({ theme }) => theme.palette.greyScale.white};
    box-sizing: border-box;
    width: 48px;
    height: 26px;
    border: 1px solid ${({ theme }) => theme.palette.greyScale.grey400};
    border-radius: 13px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
