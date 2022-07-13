import styled from 'styled-components';
import dad from '@assets/illust/banki/sheet-dad.svg';
import mom from '@assets/illust/banki/sheet-mom.svg';
import son from '@assets/illust/banki/sheet-son.svg';
import daughter from '@assets/illust/banki/sheet-daughter.svg';
import Button from '@components/common/Button/Button';

interface SelectProfileProps {
  role: '엄마' | '아빠' | '아들' | '딸';
}

function SelectProfile({ role }: SelectProfileProps) {
  const setCharacter = (role: '엄마' | '아빠' | '아들' | '딸') => {
    switch (role) {
      case '엄마':
        return <img src={mom} />;
        break;
      case '아빠':
        return <img src={dad} />;
        break;
      case '아들':
        return <img src={son} />;
        break;
      case '딸':
        return <img src={daughter} />;
        break;
    }
  };

  return (
    <Wrapper>
      <Container>
        <p>
          {role}
          {role === '아들' || role === '딸' ? '이' : '가'} 맞나요?
        </p>
        <p>한 번 설정한 프로필은 변경하기 어려워요</p>
        <div style={{ margin: '0 auto' }}>{setCharacter(role)}</div>
      </Container>
      <Button label="확인" />
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
