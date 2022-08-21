import { selectInProcess } from '@store/slices/createChallengeSlice';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface CheckProcessProps {
  children: JSX.Element;
  currentStep: number;
}

const CheckProcess = ({ children, currentStep }: CheckProcessProps) => {
  const inProcess = useSelector(selectInProcess);
  if (currentStep !== 1 && !inProcess) {
    return <Navigate to="/create/1" />;
  } else {
    return <>{children}</>;
  }
};

export default CheckProcess;
