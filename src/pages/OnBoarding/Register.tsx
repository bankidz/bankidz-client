import { useParams } from 'react-router-dom';
import GoBackHeader from '@components/common/buttons/GoBackHeader';
import MarginTemplate from '@components/layout/MarginTemplate';
import RegisterBirthday from '@components/register/RegisterBirthday';
import RegisterRole from '@components/register/RegisterRole';

function RegisterPage() {
  const { step } = useParams();
  const currentStep = getValidCurrentStep(parseInt(step!));
  function getValidCurrentStep(step: number) {
    if (1 <= step && step <= 2) {
      return step;
    } else {
      console.error('부적절한 접근입니다.');
    }
  }

  return (
    <>
      <GoBackHeader />
      <MarginTemplate>
        {currentStep === 1 && <RegisterBirthday />}
        {currentStep === 2 && <RegisterRole />}
      </MarginTemplate>
    </>
  );
}

export default RegisterPage;
