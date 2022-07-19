import RegisterBirth from '@components/common/register/RegisterBirthday';
import RegisterRole from '@components/common/register/RegisterRole';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import MarginTemplate from '@components/layout/MarginTemplate';
import { axiosPublic } from '@lib/api/axios';
import { useParams } from 'react-router-dom';

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

  async function handleClick() {
    try {
      const response = await axiosPublic.patch('/user/refresh');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ForegroundTemplate label="">
        <MarginTemplate>
          {currentStep === 1 && <RegisterBirth />}
          {currentStep === 2 && <RegisterRole />}
        </MarginTemplate>
      </ForegroundTemplate>
      {/* TODO: test code */}
      <button onClick={handleClick}>토큰 리프레시 테스트</button>
    </>
  );
}

export default RegisterPage;
