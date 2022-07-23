import RegisterBirth from '@components/register/RegisterBirthday';
import RegisterRole from '@components/register/RegisterRole';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import MarginTemplate from '@components/layout/MarginTemplate';
import { axiosPublic } from '@lib/api/axios';
import { useParams } from 'react-router-dom';
import useRefreshToken from '@hooks/auth/useRefreshToken';

function RegisterPage() {
  const { step } = useParams();
  function getValidCurrentStep(step: number) {
    if (step && 1 <= step && step <= 2) {
      return step as 1 | 2;
    } else {
      console.error('부적절한 접근입니다.');
    }
  }
  const currentStep = getValidCurrentStep(parseInt(step!));

  const refresh = useRefreshToken();

  return (
    <>
      <ForegroundTemplate label="">
        <MarginTemplate>
          {currentStep === 1 && <RegisterBirth />}
          {currentStep === 2 && <RegisterRole />}
        </MarginTemplate>
      </ForegroundTemplate>
    </>
  );
}

export default RegisterPage;
