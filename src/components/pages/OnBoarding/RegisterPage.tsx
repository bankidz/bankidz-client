import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import MarginTemplate from '@components/atoms/layout/MarginTemplate';
import RegisterBirthday from '@components/blocks/register/RegisterBirthday';
import RegisterRole from '@components/blocks/register/RegisterRole';
import PushNotiConsent from '@components/blocks/register/PushNotiConsent';
import { ReactComponent as Arrow } from '@assets/icons/arrow-left-big.svg';
import useLogoutServer from '@lib/hooks/auth/useLogoutServer';
import GuideTemplate from '@components/blocks/manage/guides/GuideTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import SlideTransition from '@components/atoms/layout/SlideTransition';

function RegisterPage() {
  const { step } = useParams();
  const parsedStep = parseInt(step!);
  const logoutServer = useLogoutServer();
  const navigate = useNavigate();
  const isKid = useAppSelector(selectIsKid);

  const handleGoBackButtonClick = () => {
    logoutServer();
    navigate('/auth/login');
  };

  const goBackArrow = (
    <ArrowWrapper>
      <Arrow onClick={handleGoBackButtonClick} />
    </ArrowWrapper>
  );

  let content;
  if (parsedStep === 1) {
    content = (
      <>
        {goBackArrow}
        <MarginTemplate>
          <RegisterBirthday />
        </MarginTemplate>
      </>
    );
  } else if (parsedStep === 2) {
    content = (
      <>
        {goBackArrow}
        <MarginTemplate margin={26}>
          <RegisterRole />
        </MarginTemplate>
      </>
    );
  } else if (parsedStep === 3) {
    content = (
      <MarginTemplate margin={26}>
        <PushNotiConsent />
      </MarginTemplate>
    );
  } else if (parsedStep === 4) {
    content = <GuideTemplate page="onboarding" isKid={isKid!} />;
  }

  return (
    <SlideTransition keyValue={step} direction={'next'}>
      <Wrapper>{content}</Wrapper>
    </SlideTransition>
  );
}

export default RegisterPage;

const ArrowWrapper = styled.div`
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  cursor: pointer;
  margin-left: 4px;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
