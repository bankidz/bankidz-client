import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectAuth } from '@store/slices/authSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRequestStatus } from 'src/pages/OnBoarding/OAuthRedirectHandler';
import styled from 'styled-components';
import CommonSheet from '../bottomSheet/CommonSheet';
import RoleButton from '../button/RoleButton';

function RegisterRole() {
  const [role, setRole] = useState('');
  function handleDadButtonClick() {
    setRole('dad');
  }
  function handleMomButtonClick() {
    setRole('mom');
  }
  function handleSonButtonClick() {
    setRole('son');
  }
  function handleDaughterButtonClick() {
    setRole('daughter');
  }

  const dispatch = useAppDispatch();
  const [registerRequestStatus, setRegisterRequestStatus] =
    useState<TRequestStatus>('idle');
  const canRegister = role && registerRequestStatus === 'idle';
  const auth = useAppSelector(selectAuth);
  const navigate = useNavigate();

  function handleSRegister() {
    if (canRegister) {
      try {
        setRegisterRequestStatus('pending');
        dispatch(register({ birthday, isKid, isFemale })).unwrap();
        setRole('');
        // navigate('/');
      } catch (error) {
        console.error(error);
      } finally {
        setRegisterRequestStatus('idle');
      }
    }
  }

  return (
    <Wrapper>
      <span className="header">프로필을 선택해요</span>
      <div className="button-wrapper">
        <RoleButton
          onClick={handleDadButtonClick}
          isKid={false}
          isFemale={false}
        />
        <RoleButton
          onClick={handleMomButtonClick}
          isKid={false}
          isFemale={true}
        />
        <RoleButton
          onClick={handleSonButtonClick}
          isKid={true}
          isFemale={false}
        />
        <RoleButton
          onClick={handleDaughterButtonClick}
          isKid={true}
          isFemale={true}
        />
      </div>
      {/* <CommonSheet
        open={open}
        onDismiss={onDismiss}
        label={'다음'}
        onClickNext={onClickNextButton}
        sheetRef={sheetRef}
        disabledNext={disabledNext}
      >
      </CommonSheet> */}
    </Wrapper>
  );
}

export default RegisterRole;

const Wrapper = styled.div`
  width: 100%;

  .header {
    width: 100%;
    height: 24px;

    margin-top: 64px;
    margin-left: 10px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }

  .button-wrapper {
    margin-top: 96px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;
    column-gap: 16px;
  }
`;
