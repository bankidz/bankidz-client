import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { kidMock } from '@lib/mocks/kid';
import { TFamilyState } from '@lib/types/family';
import { useAppDispatch } from '@store/app/hooks';
import { dispatchParent } from '@store/slices/challengePayloadSlice';
import ProfileButton from '@components/onboarding/ProfileButton';

function Step1({ currentStep }: { currentStep: number }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickProfileButton = (isFemale: boolean) => {
    dispatch(dispatchParent(isFemale));
    navigate(`/create/${currentStep + 1}`, { state: { from: currentStep } });
  };

  return (
    <Wrapper>
      <ProfileButton
        isKid={false}
        isFemale={false}
        onClick={() => onClickProfileButton(false)}
        key={'dad'}
      />
      <ProfileButton
        isKid={false}
        isFemale={true}
        onClick={() => onClickProfileButton(true)}
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
