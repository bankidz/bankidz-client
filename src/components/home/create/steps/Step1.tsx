import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kidMock } from '@lib/mocks/kid';
import { useAppDispatch } from '@store/app/hooks';
import { dispatchParent } from '@store/slices/createChallenge';
import RoleButton from '@components/common/buttons/RoleButton';

function Step1({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickRoleButton = (isFemale: boolean) => {
    dispatch(dispatchParent(isFemale));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  return (
    <Wrapper>
      <RoleButton
        isKid={false}
        isFemale={false}
        onClick={() => onClickRoleButton(false)}
        key={'dad'}
      />
      <RoleButton
        isKid={false}
        isFemale={true}
        onClick={() => onClickRoleButton(true)}
        key={'mom'}
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
