import styled from 'styled-components';
import { ReactComponent as Dad } from '@assets/illust/banki/banki_dad.svg';
import { ReactComponent as Mom } from '@assets/illust/banki/banki_mom.svg';
import { ReactComponent as Son } from '@assets/illust/banki/banki_son.svg';
import { ReactComponent as Daughter } from '@assets/illust/banki/banki_daughter.svg';
import Button from '@components/common/button/Button';
import { TRole } from '@lib/types/kid';

function SelectProfile({ role }: { role: TRole }) {
  const setCharacter = (role: '엄마' | '아빠' | '아들' | '딸') => {
    switch (role) {
      case '엄마':
        return <Mom />;
        break;
      case '아빠':
        return <Dad />;
        break;
      case '아들':
        return <Son />;
        break;
      case '딸':
        return <Daughter />;
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
        <BankiWrapper>{setCharacter(role)}</BankiWrapper>
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

const BankiWrapper = styled.div`
  height: 140px;
  padding-top: 23px;
  padding-bottom: 7px;
`;
