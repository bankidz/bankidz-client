import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectBirthday } from '@store/slices/authSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import RoleButton from '../common/buttons/RoleButton';
import useModals from '../../lib/hooks/useModals';
import Modals from '../common/modals/Modals';
import { modals } from '../common/modals/Modals';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

function RegisterRole() {
  const birthday = useAppSelector(selectBirthday);
  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);

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

  const dispatch = useAppDispatch();
  const { isOpen, setOpenBottomSheet, setCloseBottomSheet } =
    useGlobalBottomSheet();
  const axiosPrivate = useAxiosPrivate();
  const [registerStatus, setRegisterStatus] = useState<TFetchStatus>('idle');
  const canRegister =
    isKid !== null &&
    isFemale !== null &&
    birthday &&
    registerStatus === 'idle';

  async function handleSubmit() {
    console.log('handle submit');
    // if (canRegister) {
    //   try {
    //     setRegisterStatus('pending');
    //     // await dispatch(
    //     //   register({
    //     //     axiosPrivate,
    //     //     birthday,
    //     //     isKid,
    //     //     isFemale,
    //     //   }),
    //     // ).unwrap();

    //     console.log('temp');
    //     const temp = getLocalStorage('auth');
    //     setLocalStorage('auth', {
    //       accessToken: temp?.accessToken, // overwrite
    //       isKid,
    //       provider: temp?.provider, // overwrite
    //     });

    //     setCloseBottomSheet();
    //     handleModalOpen();
    //   } catch (error: any) {
    //     console.error('error in handle submit:', error);
    //   } finally {
    //     setRegisterStatus('idle');
    //   }
    // }
  }

  const openSelectProfileSheet = (isKid: boolean, isFemale: boolean) => {
    setOpenBottomSheet({
      sheetContent: 'SelectProfile',
      sheetProps: {
        open: true,
      },
      contentProps: {
        isKid: isKid,
        isFemale: isFemale,
        onClick: () => {
          handleSubmit();
        },
        // onClick: () => {
        //   console.log('click');
        // },
      },
    });
  };

  return (
    <Wrapper>
      <span>프로필을 선택해요</span>
      <RoleButtonWrapper>
        {/* 아빠 */}
        <RoleButton
          onClick={() => {
            openSelectProfileSheet(false, false);
            setIsKid(false);
            setIsFemale(false);
          }}
          isKid={false}
          isFemale={false}
          isSelected={isOpen && isKid === false && isFemale === false}
        />
        {/* 엄마 */}
        <RoleButton
          onClick={() => {
            openSelectProfileSheet(false, true);
            setIsKid(false);
            setIsFemale(true);
          }}
          isKid={false}
          isFemale={true}
          isSelected={isOpen && isKid === false && isFemale === true}
        />
        {/* 아들 */}
        <RoleButton
          onClick={() => {
            openSelectProfileSheet(true, false);
            setIsKid(true);
            setIsFemale(false);
          }}
          isKid={true}
          isFemale={false}
          isSelected={isOpen && isKid === true && isFemale === false}
        />
        {/* 딸 */}
        <RoleButton
          onClick={() => {
            openSelectProfileSheet(true, true);
            setIsKid(true);
            setIsFemale(true);
          }}
          isKid={true}
          isFemale={true}
          isSelected={isOpen && isKid === true && isFemale === true}
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

// let accessToken;
// let level: TLevel | null = null;
// if (isKid === false && isFemale === false) {
//   accessToken =
//     'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0ODQyMTQsInN1YiI6IjUiLCJleHAiOjE2NjI2OTM4MTQsImlkIjo1LCJyb2xlcyI6IlVTRVIifQ.5fKVlH-BGRRXiSP2WFtiLGheiNThQAC8wc7yj38MAG8';
// } else if (isKid === false && isFemale === true) {
//   accessToken =
//     'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjE0MTMxNTcsInN1YiI6IjIiLCJleHAiOjE2NjI2MjI3NTcsImlkIjoyLCJyb2xlcyI6IlVTRVIifQ.ev6Jy4r-sgdOmASOLQ2aioMVhkYhXFZz3HXeyBzvYwU';
// } else if (isKid === true && isFemale === false) {
//   accessToken =
//     'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjIxOTg5NTQsInN1YiI6IjQiLCJleHAiOjE2NjM0MDg1NTQsImlkIjo0LCJyb2xlcyI6IlVTRVIifQ.F3tKrx-cVOHqPeU-a8opyLVK6oHbm83eAmh12HDNji0';
//   level = -4;
// } else if (isKid === true && isFemale === true) {
//   accessToken =
//     'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjI0Nzk4MzksInN1YiI6IjMiLCJleHAiOjE2NjI0Nzk4OTksImlkIjozLCJyb2xlcyI6IlVTRVIifQ.KmzWCJfLq_b2pJ_O1NaahjDStoYWa1PB7cG4PAUZnX0';
//   level = 2;
// }
// accessToken &&
//   dispatch(setCredentials({ accessToken, isKid, level, provider: 'kakao' }));
