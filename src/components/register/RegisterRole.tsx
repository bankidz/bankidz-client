import styled from 'styled-components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectBirthday } from '@store/slices/authSlice';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import RoleButton from '../common/buttons/RoleButton';
import useModals from '../../lib/hooks/useModals';
import Modals from '../common/modals/Modals';
import { modals } from '../common/modals/Modals';
import { TFetchStatus } from '@lib/types/TFetchStatus';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import GuideTemplate from '@components/manage/guides/GuideTemplate';

function RegisterRole() {
  const birthday = useAppSelector(selectBirthday);
  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const [isTutorial, setIsTutorial] = useState<boolean>(false);

  const { openModal } = useModals();
  function handleModalOpen(isKid: boolean, isFemale: boolean) {
    openModal(modals.primaryModal, {
      onSubmit: () => {
        setIsTutorial(true);
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
  const canRegister = birthday && registerStatus === 'idle';

  async function handleSubmit(isKid: boolean, isFemale: boolean) {
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
        setCloseBottomSheet();
        handleModalOpen(isKid, isFemale);
      } catch (error: any) {
        console.error(error);
      } finally {
        setRegisterStatus('idle');
      }
    }
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
          handleSubmit(isKid, isFemale);
        },
      },
    });
  };

  return (
    <Wrapper>
      <Modals />
      {isTutorial ? (
        <GuideTemplate page="onboarding" isKid={isKid!} />
      ) : (
        <>
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
        </>
      )}
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
