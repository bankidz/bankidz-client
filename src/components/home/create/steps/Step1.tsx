import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kidMock } from '@lib/mocks/kid';
import { useAppDispatch } from '@store/app/hooks';
import {
  dispatchInProcess,
  dispatchParent,
} from '@store/slices/createChallengeSlice';
import RoleButton from '@components/common/buttons/RoleButton';

function Step1({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // TODO: 이벤트 핸들러 이름: handle ~, on ~
  const onClickRoleButton = (isFemale: boolean) => {
    dispatch(dispatchParent(isFemale));
    dispatch(dispatchInProcess());
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
