import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectAuth, setRole } from '@store/slices/authSlice';
import { TRequestStatus } from 'src/pages/OnBoarding/OAuthRedirectHandler';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import RoleButton from '../button/RoleButton';
import CommonSheet from '../bottomSheet/CommonSheet';
import useBottomSheet from '@hooks/useBottomSheet';

function RegisterRole() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  function handleDadButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: false }));
  }
  function handleMomButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: true }));
  }
  function handleSonButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: false }));
  }
  function handleDaughterButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: true }));
  }

  const [registerRequestStatus, setRegisterRequestStatus] =
    useState<TRequestStatus>('idle');
  const canRegister =
    auth.isKid !== null &&
    auth.isFemale !== null &&
    registerRequestStatus === 'idle';
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (canRegister) {
      setRegisterRequestStatus('pending');
      dispatch(
        register({
          axiosPrivate,
          birthday: auth.birthday,
          isKid: auth.isKid,
          isFemale: auth.isFemale,
        }),
      );
      setRegisterRequestStatus('idle');
      // navigate('/');
    }
  }

  return (
    <Wrapper>
      <span className="header">프로필을 선택해요</span>
      <button onClick={handleSubmit}>Submit Test</button>
      <div className="button-wrapper">
        {/* 아빠 */}
        <RoleButton
          onClick={handleDadButtonClick}
          isKid={false}
          isFemale={false}
          isSelected={auth.isKid === false && auth.isFemale === false}
        />
        {/* 엄마 */}
        <RoleButton
          onClick={handleMomButtonClick}
          isKid={false}
          isFemale={true}
          isSelected={auth.isKid === false && auth.isFemale === true}
        />
        {/* 아들 */}
        <RoleButton
          onClick={handleSonButtonClick}
          isKid={true}
          isFemale={false}
          isSelected={auth.isKid === true && auth.isFemale === false}
        />
        {/* 딸 */}
        <RoleButton
          onClick={handleDaughterButtonClick}
          isKid={true}
          isFemale={true}
          isSelected={auth.isKid === true && auth.isFemale === true}
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
