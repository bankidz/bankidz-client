import styled from 'styled-components';
import Button from '@components/atoms/buttons/Button';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { KAKAO_AUTH_URL } from '@lib/constants/KAKAO_AUTH_URL';
import { APPLE_AUTH_URL } from '@lib/constants/APPLE_AUTH_URL';
import { ReactComponent as Apple } from '@assets/icons/apple.svg';

function LoginPage() {
  return (
    <Wrapper>
      <MarginTemplate>
        <TextWrapper>
          <Logo />
          <p>뱅키즈에 오신 것을 환영합니다!</p>
        </TextWrapper>
        <ButtonWithMarginBottom
          label="카카오톡으로 로그인"
          onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          property="kakao"
        />
        <LoginWithApple href={APPLE_AUTH_URL}>
          <Apple />
          <p>{'APPLE로 로그인'}</p>
        </LoginWithApple>
        {/* <ButtonWithMarginBottom
          label="APPLE로 로그인"
          onClick={() => (window.location.href = APPLE_AUTH_URL)}
          property="apple"
        /> */}
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

const LoginWithApple = styled.a`
  margin-bottom: 30px;
  height: 49px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.medium};
  border: none;

  color: ${({ theme }) => theme.palette.greyScale.white};
  background-color: black;

  cursor: pointer;
  &:active {
    color: ${({ theme }) => theme.palette.greyScale.grey300};
  }
  :disabled {
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
  }

  p {
    ${({ theme }) => theme.typo.button.Primary_T_15_EB}
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    margin-bottom: -3px;
  }
`;

// https://developer.apple.com/forums/thread/122857
