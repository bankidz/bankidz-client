import Button from '@components/common/buttons/Button';
import MarginTemplate from '@components/layout/MarginTemplate';
import { KAKAO_AUTH_URL } from '@lib/constants';
import styled from 'styled-components';

function LoginPage() {
  function handleClick() {
    window.location.href = KAKAO_AUTH_URL;
  }
  return (
    <Wrapper>
      <MarginTemplate>
        <TextWrapper>
          <span className="title">BANKIDZ</span>
          <span className="congrats">뱅키즈에 오신 것을 환영합니다!</span>
        </TextWrapper>
        <ButtonWithMarginBottom
          label="카카오로 시작하기"
          property="kakao"
          onClick={handleClick}
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

const ButtonWithMarginBottom = styled(Button)`
  margin-bottom: 16px;
`;
