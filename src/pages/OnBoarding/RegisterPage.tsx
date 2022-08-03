import RegisterBirth from '@components/register/RegisterBirthday';
import RegisterRole from '@components/register/RegisterRole';
import MarginTemplate from '@components/layout/MarginTemplate';
import { useParams } from 'react-router-dom';
import GoBackHeader from '@components/common/buttons/GoBackHeader';

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
  return (
    <>
      <GoBackHeader />
      <MarginTemplate>
        {currentStep === 1 && <RegisterBirth />}
        {currentStep === 2 && <RegisterRole />}
      </MarginTemplate>
    </>
  );
}

export default RegisterPage;
