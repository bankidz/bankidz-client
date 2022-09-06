import { useParams } from 'react-router-dom';
import GoBackHeader from '@components/common/buttons/GoBackHeader';
import MarginTemplate from '@components/layout/MarginTemplate';
import RegisterBirthday from '@components/register/RegisterBirthday';
import RegisterRole from '@components/register/RegisterRole';
import isBetween from '@lib/utils/isBetween';

function RegisterPage() {
  const { step } = useParams();
  const currentStep = isBetween(parseInt(step!), 1, 2);
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
