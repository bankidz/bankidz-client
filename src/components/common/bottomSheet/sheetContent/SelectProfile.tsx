import styled from 'styled-components';
import { ReactComponent as SvgDadBanki } from '@assets/illust/profile-banki-dad.svg';
import Button from '@components/common/Button/Button';

interface SelectProfileProps {
  role: '엄마' | '아빠' | '아들' | '딸';
}

function SelectProfile({ role }: SelectProfileProps) {
  return (
    <Wrapper>
      <Container>
        <p>
          {role}
          {role === '아들' || role === '딸' ? '이' : '가'} 맞나요?
        </p>
        <p>한 번 설정한 프로필은 변경하기 어려워요</p>
        <BankyWrapper>
          <SvgDadBanki />
        </BankyWrapper>
      </Container>
      <Button label="확인" />
    </Wrapper>
  );
}

export default SelectProfile;

const Wrapper = styled.div``;

const Container = styled.div`
  margin: 29px 16px 36px 16px;
  display: grid;
  grid-template-rows: auto;
  grid-gap: 16px;

  & > p:first-child {
    ${({ theme }) => theme.typo.popup.Title_T_21_EB}
    color: ${({ theme }) => theme.palette.black};
  }
  & > p:nth-child(2) {
    ${({ theme }) => theme.typo.popup.Sub_S_14_R}
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;

const BankyWrapper = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
