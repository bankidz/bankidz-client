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
      // TODO: flow 벗어나는 경우 어떻게 handle 할것인지 논의하기
      return alert('부적절한 접근입니다.');
    }
  }
  const currentStep = getValidCurrentStep(parseInt(step!));

  function handleClick() {
    console.log('click!');
    const refresh = async () => {
      console.log('async!');
      try {
        const response = await axiosPublic.patch('/user/refresh');
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    refresh();
  }

  return (
    <>
      <ForegroundTemplate label="">
        <MarginTemplate>
          {currentStep === 1 && <RegisterBirth />}
          {currentStep === 2 && <RegisterRole />}
        </MarginTemplate>
      </ForegroundTemplate>
      <button onClick={handleClick}>토큰 리프레시 테스트</button>
    </>
  );
}

export default RegisterPage;
