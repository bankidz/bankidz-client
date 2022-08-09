import styled from 'styled-components';
import Button from '@components/common/buttons/Button';
import { HTMLAttributes } from 'react';
import renderRoleText from '@lib/utils/common/getRoleText';
import renderRoleIllust from '@lib/utils/common/renderRoleIllust';

interface SelectProfileProps extends HTMLAttributes<HTMLButtonElement> {
  isKid: boolean | null;
  isFemale: boolean | null;
}

function SelectProfile({ isKid, isFemale, ...props }: SelectProfileProps) {
  return (
    <Wrapper>
      <Container>
        <p>
          {renderRoleText(isKid!, isFemale!)}
          {isKid ? '이' : '가'} 맞나요?
        </p>
        <p>한 번 설정한 프로필은 변경하기 어려워요</p>
        <BankiWrapper>{renderRoleIllust(isKid!, isFemale!)}</BankiWrapper>
      </Container>
      {/* @ts-expect-error */}
      <Button label="확인" {...props} />
    </Wrapper>
  );
}

export default SelectProfile;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 25px 16px 36px 16px;
  display: grid;
  grid-template-rows: auto;
  grid-gap: 16px;

  & > p:first-child {
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
  & > p:nth-child(2) {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.greyScale.grey500};
  }
`;

const BankiWrapper = styled.div`
  height: 140px;
  padding-top: 23px;
  padding-bottom: 7px;
`;
