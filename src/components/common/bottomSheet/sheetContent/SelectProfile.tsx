import styled from 'styled-components';
import { ReactComponent as DadBanky } from '../../../../assets/banky/dad.svg';
import Button from '../../Button/Button';

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
          <DadBanky />
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
    font-family: 'TmoneyRoundWind';
    font-size: 21px;
    line-height: 21px;
    font-weight: 800;
    color: ${({ theme }) => theme.palette.black};
  }
  & > p:nth-child(2) {
    font-family: 'TmoneyRoundWind';
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.palette.gray[5]};
  }
`;

const BankyWrapper = styled.div`
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
