import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectAuth, setRole } from '@store/slices/authSlice';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import RoleButton from '../button/RoleButton';
import CommonSheet from '../bottomSheet/CommonSheet';
import useBottomSheet from '@hooks/useBottomSheet';
import Button from '../button/Button';
import { renderRoleIllust } from '@lib/utils/renderRole';
import SelectProfile from '../bottomSheet/sheetContent/SelectProfile';
import useModals from '../modal/useModals';
import { modals } from '../modal/Modals';
import Modals from '../modal/Modals';
import { TRequestStatus } from '@lib/types/api';

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

  const [open, onOpen, onDismiss] = useBottomSheet();
  // onDissmiss는 내리기

  function renderText() {
    let headerText;
    if (auth.isKid === false && auth.isFemale === false) {
      headerText = '아빠가 맞나요?';
    } else if (auth.isKid === false && auth.isFemale === true) {
      headerText = '엄마가 맞나요?';
    } else if (auth.isKid === true && auth.isFemale === false) {
      headerText = '아들이 맞나요?';
    } else {
      headerText = '딸이 맞나요?';
    }
    return (
      <div className="text-wrapper">
        <span className="header">{headerText}</span>
        <span className="body">한 번 설정한 프로필은 변경하기 어려워요</span>
      </div>
    );
  }

  const { openModal } = useModals();
  function handleClick() {
    // modals.myModal: 열고자 하는 모달
    // {...}: submit 시 처리되는 비즈니스 로직
    openModal(modals.tertiaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      isKid: auth.isKid,
      isFemale: auth.isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  }

  return (
    <Wrapper>
      <button onClick={handleClick}>모달 열기</button>
      <button
        onClick={() => {
          onOpen();
        }}
      >
        바텀시트 열기
      </button>
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
      <CommonSheet open={open} onDismiss={onDismiss}>
        <SelectProfile isKid={auth.isKid} isFemale={auth.isFemale} />
      </CommonSheet>
      {/* @ts-expect-error */}
      <Modals />
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

const SheetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    width: 100%;

    background: pink;
    .header {
    }
    .body {
    }
  }

  svg {
    width: 20%;
  }
`;
