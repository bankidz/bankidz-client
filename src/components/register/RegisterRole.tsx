import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  register,
  selectBirthday,
  setCredentials,
} from '@store/slices/authSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import RoleButton from '../common/buttons/RoleButton';
import useModals from '../../lib/hooks/useModals';
import Modals from '../common/modals/Modals';
import { modals } from '../common/modals/Modals';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { TLevel } from '@lib/types/TLevel';

function RegisterRole() {
  const dispatch = useAppDispatch();
  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const birthday = useAppSelector(selectBirthday);
  const { isOpen, setOpenBottomSheet, setCloseBottomSheet } =
    useGlobalBottomSheet();

  // 아빠
  function handleDadButtonClick() {
    if (!isOpen) {
      setIsKid(false);
      setIsFemale(false);
      openSelectProfileSheet();
    }
  }
  // 엄마
  function handleMomButtonClick() {
    if (!isOpen) {
      setIsKid(false);
      setIsFemale(true);
      openSelectProfileSheet();
    }
  }
  // 아들
  function handleSonButtonClick() {
    if (!isOpen) {
      setIsKid(true);
      setIsFemale(false);
      openSelectProfileSheet();
    }
  }
  // 딸
  function handleDaughterButtonClick() {
    if (!isOpen) {
      setIsKid(true);
      setIsFemale(true);
      openSelectProfileSheet();
    }
  }

  const { openModal } = useModals();
  const navigate = useNavigate();
  function handleModalOpen() {
    openModal(modals.primaryModal, {
      onSubmit: () => {
        navigate('/', { replace: true });
      },
      isKid,
      isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  }

  const axiosPrivate = useAxiosPrivate();
  const [registerStatus, setRegisterStatus] = useState<TFetchStatus>('idle');
  const canRegister =
    isKid !== null &&
    isFemale !== null &&
    birthday &&
    registerStatus === 'idle';

  async function handleSubmit() {
    if (canRegister) {
      try {
        setRegisterStatus('pending');
        await dispatch(
          register({
            axiosPrivate,
            birthday,
            isKid,
            isFemale,
          }),
        ).unwrap();

        let accessToken;
        let level: TLevel | null = null;
        if (isKid === false && isFemale === false) {
          accessToken =
            'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0ODQyMTQsInN1YiI6IjUiLCJleHAiOjE2NjI2OTM4MTQsImlkIjo1LCJyb2xlcyI6IlVTRVIifQ.5fKVlH-BGRRXiSP2WFtiLGheiNThQAC8wc7yj38MAG8';
        } else if (isKid === false && isFemale === true) {
          accessToken =
            'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0MTMxNTcsInN1YiI6IjIiLCJleHAiOjE2NjI2MjI3NTcsImlkIjoyLCJyb2xlcyI6IlVTRVIifQ.ev6Jy4r-sgdOmASOLQ2aioMVhkYhXFZz3HXeyBzvYwU';
        } else if (isKid === true && isFemale === false) {
          accessToken =
            'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxOTg5NTQsInN1YiI6IjQiLCJleHAiOjE2NjM0MDg1NTQsImlkIjo0LCJyb2xlcyI6IlVTRVIifQ.F3tKrx-cVOHqPeU-a8opyLVK6oHbm83eAmh12HDNji0';
          level = -4;
        } else if (isKid === true && isFemale === true) {
          accessToken =
            'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjI0NjYxMTYsInN1YiI6IjMiLCJleHAiOjE2NjI0NjYxNzYsImlkIjozLCJyb2xlcyI6IlVTRVIifQ.YiKX_aC38euioOH9Fyc0It0SsQM8AHkRD2l9onsDZyw';
          level = 2;
        }
        accessToken &&
          dispatch(
            setCredentials({ accessToken, isKid, level, provider: 'kakao' }),
          );

        setCloseBottomSheet();
        handleModalOpen();
      } catch (error: any) {
        console.error('error in handle submit:', error);
      } finally {
        setRegisterStatus('idle');
      }
    }
  }

  const openSelectProfileSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'SelectProfile',
      sheetProps: {
        open: true,
      },
      contentProps: {
        isKid: isKid,
        isFemale: isFemale,
        onClick: handleSubmit,
      },
    });
  };

  return (
    <Wrapper>
      <span>프로필을 선택해요</span>
      <RoleButtonWrapper>
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
      </RoleButtonWrapper>
      <Modals />
    </Wrapper>
  );
}

export default RegisterRole;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  & > span {
    margin-left: 8px;
    ${({ theme }) => theme.typo.input.Title_T_24_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const RoleButtonWrapper = styled.div`
  margin-top: 96px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 16px;
`;
