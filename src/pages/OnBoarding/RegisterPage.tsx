import { useNavigate, useParams } from 'react-router-dom';
import MarginTemplate from '@components/layout/MarginTemplate';
import RegisterBirthday from '@components/register/RegisterBirthday';
import RegisterRole from '@components/register/RegisterRole';
import { ReactComponent as Arrow } from '@assets/icons/arrow-left-big.svg';
import styled from 'styled-components';
import useLogoutServer from '@lib/hooks/auth/useLogoutServer';
import GuideTemplate from '@components/manage/guides/GuideTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

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

  return (
    <>
      {parsedStep !== 3 && (
        <ArrowWrapper>
          <Arrow onClick={handleGoBackButtonClick} />
        </ArrowWrapper>
      )}
      <MarginTemplate>
        {parsedStep === 1 && <RegisterBirthday />}
        {parsedStep === 2 && <RegisterRole />}
      </MarginTemplate>
      {parsedStep === 3 && <GuideTemplate page="onboarding" isKid={isKid!} />}
    </>
  );
}

export default RegisterPage;

const ArrowWrapper = styled.div`
  width: 100%;
  height: 48px;
  box-sizing: border-box;
`;
