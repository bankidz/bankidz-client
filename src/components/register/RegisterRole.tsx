import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  register,
  selectBirthday,
  setCredentials,
} from '@store/slices/authSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import RoleButton from '../common/buttons/RoleButton';
import CommonSheet from '../common/bottomSheets/CommonSheet';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import SelectProfile from '../common/bottomSheets/sheetContents/SelectProfile';
import useModals from '../../lib/hooks/useModals';
import { modals } from '../common/modals/Modals';
import Modals from '../common/modals/Modals';
import { useState } from 'react';
import { TFetchStatus } from '@lib/types/api';
import useBottomSheetOutSideRef from '@lib/hooks/useBottomSheetOutSideRef';
import { getAllJSDocTagsOfKind } from 'typescript';
import { TLevel } from '@lib/types/common';
import GoBackHeader from '@components/common/buttons/GoBackHeader';

function RegisterRole() {
  const dispatch = useAppDispatch();

  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const birthday = useAppSelector(selectBirthday);

  const [open, onOpen, onDismiss] = useBottomSheet(false);
  const [sheetDivRef, inputDivRef] = useBottomSheetOutSideRef(onDismiss);

  // 아빠
  function handleDadButtonClick() {
    if (!open) {
      setIsKid(false);
      setIsFemale(false);
      onOpen();
    }
  }
  // 엄마
  function handleMomButtonClick() {
    if (!open) {
      setIsKid(false);
      setIsFemale(true);
      onOpen();
    }
  }
  // 아들
  function handleSonButtonClick() {
    if (!open) {
      setIsKid(true);
      setIsFemale(false);
      onOpen();
    }
  }
  // 딸
  function handleDaughterButtonClick() {
    if (!open) {
      setIsKid(true);
      setIsFemale(true);
      onOpen();
    }
    dispatch(
      setCredentials({ accessToken: 'asdf', isKid: false, level: null }),
    );
  }

  const { openModal } = useModals();
  const navigate = useNavigate();
  function handleModalOpen() {
    openModal(modals.primaryModal, {
      onSubmit: () => {
        navigate('/');
      },
      isKid: isKid,
      isFemale: isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  }

  const axiosPrivate = useAxiosPrivate();
  const [registerStatus, setRegisterStatus] = useState<TFetchStatus>('idle');
  const canRegister =
    isKid !== null && isFemale !== null && registerStatus === 'idle';

  async function handleSubmit() {
    if (canRegister) {
      try {
        setRegisterStatus('pending');
        // await dispatch(
        //   register({
        //     axiosPrivate,
        //     birthday,
        //     isKid,
        //     isFemale,
        //   }),
        // ).unwrap();

        // TODO: for demo day
        let accessToken;
        let level: TLevel | null = null;
        if (isKid === false && isFemale === false) {
          accessToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTE0NzM3LCJzdWIiOiI1IiwiZXhwIjoxNjYxMzMzOTM3LCJpZCI6NSwicm9sZXMiOiJVU0VSIn0.lQX8aymHJXp8wXcgcix9x32ZQCwjP2arI3WEPvLLRRk';
        } else if (isKid === false && isFemale === true) {
          accessToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTE0NzY1LCJzdWIiOiIyIiwiZXhwIjoxNjYxMzMzOTY1LCJpZCI6Miwicm9sZXMiOiJVU0VSIn0.f2B_gezGmD6uKh2Js3Y_blrLJGOFyWXzqva5MAXmbqc';
        } else if (isKid === true && isFemale === false) {
          accessToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTkwMDAwLCJzdWIiOiI0IiwiZXhwIjoxNjYxNDA5MjAwLCJpZCI6NCwicm9sZXMiOiJVU0VSIn0.Sad0Wtg4-T8tW-m4OoGQZBCbWCO8D5S1YwZIjoHfGw0';
          level = 3;
        } else if (isKid === true && isFemale === true) {
          accessToken =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYW5raWRzIiwiaWF0IjoxNjU4OTkwMDYxLCJzdWIiOiIzIiwiZXhwIjoxNjYxNDA5MjYxLCJpZCI6Mywicm9sZXMiOiJVU0VSIn0.iiMmsuks0oWYctTmKt0fEJgacIl13XNSoAjyY6Jd7QU';
          level = 4;
        }
        accessToken && dispatch(setCredentials({ accessToken, isKid, level }));

        onDismiss();
        handleModalOpen();
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setRegisterStatus('idle');
      }
    }
  }

  return (
    <Wrapper>
      <span>프로필을 선택해요</span>
      <div className="button-wrapper">
        {/* 아빠 */}
        <RoleButton
          onClick={handleDadButtonClick}
          isKid={false}
          isFemale={false}
          isSelected={isKid === false && isFemale === false}
        />
        {/* 엄마 */}
        <RoleButton
          onClick={handleMomButtonClick}
          isKid={false}
          isFemale={true}
          isSelected={isKid === false && isFemale === true}
        />
        {/* 아들 */}
        <RoleButton
          onClick={handleSonButtonClick}
          isKid={true}
          isFemale={false}
          isSelected={isKid === true && isFemale === false}
        />
        {/* 딸 */}
        <RoleButton
          onClick={handleDaughterButtonClick}
          isKid={true}
          isFemale={true}
          isSelected={isKid === true && isFemale === true}
        />
      </div>
      <div ref={inputDivRef}></div>
      <CommonSheet open={open} onDismiss={onDismiss} sheetRef={sheetDivRef}>
        <SelectProfile
          isKid={isKid}
          isFemale={isFemale}
          onClick={handleSubmit}
        />
      </CommonSheet>
      <Modals />
    </Wrapper>
  );
}

export default RegisterRole;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  & > span {
    width: 100%;
    height: 24px;
    margin-left: 8px;
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
