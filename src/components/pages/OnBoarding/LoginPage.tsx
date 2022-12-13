import styled from 'styled-components';
import { debounce } from 'throttle-debounce';
import Button from '@components/atoms/buttons/Button';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import { ReactComponent as Logo } from '@assets/icons/logo.svg';
import { KAKAO_AUTH_URL } from '@lib/constants/KAKAO_AUTH_URL';
import { APPLE_AUTH_URL } from '@lib/constants/APPLE_AUTH_URL';

function LoginPage() {
  const handleLoginWithAppleWithDebouncing = debounce(1000, () => {
    location.href = APPLE_AUTH_URL;
  });

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
        <ButtonWithMarginBottom
          label="APPLE로 로그인 location.href"
          onClick={() => (location.href = APPLE_AUTH_URL)}
          property="apple"
        />
        <ButtonWithMarginBottom
          label="APPLE로 로그인 debouncing"
          onClick={handleLoginWithAppleWithDebouncing}
          property="apple"
        />
        <ButtonWithMarginBottom
          label="APPLE로 로그인 setTimeout 250"
          onClick={() =>
            setTimeout(() => {
              document.location.href = APPLE_AUTH_URL;
            }, 250)
          }
          property="apple"
        />
        <ButtonWithMarginBottom
          label="APPLE로 로그인 document.location.assign"
          onClick={() => document.location.assign(APPLE_AUTH_URL)}
          property="apple"
        />
        <ButtonWithMarginBottom
          label="APPLE로 로그인 location.assign"
          onClick={() => location.assign(APPLE_AUTH_URL)}
          property="apple"
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

// https://developer.apple.com/forums/thread/122857
