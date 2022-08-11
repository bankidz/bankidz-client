import styled from 'styled-components';
import Button from '@components/common/buttons/Button';
import MarginTemplate from '@components/layout/MarginTemplate';
import { KAKAO_AUTH_URL } from '@lib/constants';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <MarginTemplate>
        <TextWrapper>
          <Logo />
          <p>뱅키즈에 오신 것을 환영합니다!</p>
        </TextWrapper>
        <ButtonWithMarginBottom
          label="시연 체험해보기"
          // TODO: demo day
          onClick={() => navigate('/register/1')}
          property="default"
        />
        <ButtonWithMarginBottom
          label="카카오로 시작하기"
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          property="kakao"
          state={false}
        />
      </MarginTemplate>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  background-color: ${({ theme }) => theme.palette.greyScale.white};
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  margin-bottom: calc(var(--vh, 1vh) * 42);
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    margin-top: 16px;
    ${({ theme }) => theme.typo.text.T_16_EB}
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const ButtonWithMarginBottom = styled(Button)`
  margin-bottom: 16px;
`;
