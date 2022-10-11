import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '@store/app/hooks';
import RoleButton from '@components/common/buttons/RoleButton';
import { setInProcess, setParent } from '@store/slices/createChallengeSlice';
import { CreateStepProps } from 'src/pages/Home/Create';

function Step1({ onNextButtonClick }: CreateStepProps) {
  const dispatch = useAppDispatch();

  const onClickRoleButton = (isFemale: boolean) => {
    dispatch(setParent(isFemale));
    dispatch(setInProcess());
    onNextButtonClick();
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
