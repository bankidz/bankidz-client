import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { register, selectAuth, setRole } from '@store/slices/authSlice';
import useAxiosPrivate from '@hooks/api/useAxiosPrivate';
import RoleButton from '../button/RoleButton';
import CommonSheet from '../bottomSheet/CommonSheet';
import useBottomSheet from '@hooks/useBottomSheet';
import SelectProfile from '../bottomSheet/sheetContent/SelectProfile';
import useModals from '../../../hooks/useModals';
import { modals } from '../modal/Modals';
import Modals from '../modal/Modals';

function RegisterRole() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
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
      isKid: auth.isKid,
      isFemale: auth.isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  }

  const canRegister = auth.isKid !== null && auth.isFemale !== null;
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  function handleSubmit() {
    if (canRegister) {
      dispatch(
        register({
          axiosPrivate,
          birthday: auth.birthday,
          isKid: auth.isKid,
          isFemale: auth.isFemale,
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
        <SelectProfile
          isKid={auth.isKid}
          isFemale={auth.isFemale}
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
