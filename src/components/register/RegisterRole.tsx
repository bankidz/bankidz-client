import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectBirthday } from '@store/slices/authSlice';
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

function RegisterRole() {
  const dispatch = useAppDispatch();

  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const birthday = useAppSelector(selectBirthday);

  const [open, onOpen, onDismiss] = useBottomSheet(false);

  function handleDadButtonClick() {
    setIsKid(false);
    setIsFemale(false);
    onOpen();
  }
  function handleMomButtonClick() {
    setIsKid(false);
    setIsFemale(true);
    onOpen();
  }
  function handleSonButtonClick() {
    setIsKid(true);
    setIsFemale(false);
    onOpen();
  }
  function handleDaughterButtonClick() {
    setIsKid(true);
    setIsFemale(true);
    onOpen();
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
  const [registerRequestStatus, setRegisterRequestStatus] =
    useState<TFetchStatus>('idle');
  const canRegister =
    isKid !== null && isFemale !== null && registerRequestStatus === 'idle';

  async function handleSubmit() {
    if (canRegister) {
      try {
        setRegisterRequestStatus('pending');
        await dispatch(
          register({
            axiosPrivate,
            birthday,
            isKid,
            isFemale,
          }),
        ).unwrap();
        onDismiss();
        handleModalOpen();
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setRegisterRequestStatus('idle');
      }
    }
  }

  return (
    <Wrapper>
      <span className="header">프로필을 선택해요</span>
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
      <CommonSheet open={open} onDismiss={onDismiss}>
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
