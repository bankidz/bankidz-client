import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  register,
  selectBirthday,
  selectIsFemale,
  selectIsKid,
  setRole,
} from '@store/slices/authSlice';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import RoleButton from '../common/button/RoleButton';
import CommonSheet from '../common/bottomSheet/CommonSheet';
import useBottomSheet from '@hooks/useBottomSheet';
import SelectProfile from '../common/bottomSheet/sheetContent/SelectProfile';
import useModals from '../../hooks/useModals';
import { modals } from '../common/modal/Modals';
import Modals from '../common/modal/Modals';

function RegisterRole() {
  const dispatch = useAppDispatch();
  const isKid = useAppSelector(selectIsKid);
  const isFemale = useAppSelector(selectIsFemale);
  const birthday = useAppSelector(selectBirthday);

  const [open, onOpen, onDismiss] = useBottomSheet();

  function handleDadButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: false }));
    onOpen();
  }
  function handleMomButtonClick() {
    dispatch(setRole({ isKid: false, isFemale: true }));
    onOpen();
  }
  function handleSonButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: false }));
    onOpen();
  }
  function handleDaughterButtonClick() {
    dispatch(setRole({ isKid: true, isFemale: true }));
    onOpen();
  }

  const { openModal } = useModals();
  function handleModalOpen() {
    openModal(modals.primaryModal, {
      onSubmit: () => {
        console.log('비즈니스 로직 처리...');
      },
      isKid: isKid,
      isFemale: isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  }

  const canRegister = isKid !== null && isFemale !== null;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  function handleSubmit() {
    if (canRegister) {
      dispatch(
        register({
          axiosPrivate,
          birthday: birthday,
          isKid,
          isFemale,
        }),
      );
      onDismiss();
      handleModalOpen();
      console.log('가입 성공');
      navigate('/');
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
