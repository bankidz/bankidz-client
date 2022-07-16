import { useAppSelector } from '@store/app/hooks';
import { selectAuth } from '@store/slices/authSlice';
import styled from 'styled-components';

const DOMAIN = 'http://localhost:3000'; // TODO: mv to constant

const REST_API_KEY = `${process.env.REACT_APP_KAKAO_REST_API_KEY}`;
const REDIRECT_URI = `${DOMAIN}/auth/kakao/callback`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function LoginPage() {
  const auth = useAppSelector(selectAuth);

  // console.log('aT in login page');
  // console.log(auth);

  return (
    <Wrapper>
      <TextWrapper>
        <span className="title">BANKIDZ</span>
        <span className="congrats">뱅키즈에 오신 것을 환영합니다!</span>
      </TextWrapper>
      <StartWithKakao href={KAKAO_AUTH_URL}>카카오로 시작하기</StartWithKakao>
    </Wrapper>
  );
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  margin-bottom: 50vh;
  width: 100%;
  height: 62px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    // typo exception
    font-family: 'Tmoney RoundWind';
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 36px;
    color: ${({ theme }) => theme.palette.main.yellow400};
  }

  .congrats {
    margin-top: 16px;
    ${({ theme }) => theme.typo.text.T_16_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const StartWithKakao = styled.a`
  width: 90%;
  height: 49px;
  background: yellow;
  margin-bottom: 31px;
`;
