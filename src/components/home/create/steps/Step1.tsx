import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '@store/app/hooks';
import RoleButton from '@components/common/buttons/RoleButton';
import { setInProcess, setParent } from '@store/slices/createChallengeSlice';

function Step1({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickRoleButton = (isFemale: boolean) => {
    dispatch(setParent(isFemale));
    dispatch(setInProcess());
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  return (
    <Wrapper>
      <RoleButton
        isKid={false}
        isFemale={false}
        onClick={() => onClickRoleButton(false)}
      />
      <RoleButton
        isKid={false}
        isFemale={true}
        onClick={() => onClickRoleButton(true)}
      />
    </Wrapper>
  );
}

export default Step1;

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;
