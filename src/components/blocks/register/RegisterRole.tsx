import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import RoleButton from '../../atoms/buttons/RoleButton';
import useModals from '../../../lib/hooks/useModals';
import { modals } from '../../atoms/modals/Modals';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import { assignIsKid, selectBirthday } from '@store/slices/authSlice';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import userAPI from '@lib/apis/user/userAPI';

function RegisterRole() {
  const { isOpen, setOpenBottomSheet, setCloseBottomSheet } =
    useGlobalBottomSheet();
  const { openModal } = useModals();
  const [isKid, setIsKid] = useState<boolean | null>(null);
  const [isFemale, setIsFemale] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const birthday = useAppSelector(selectBirthday);
  const registerMutation = useMutation(userAPI.patchUser, {
    onSuccess: (data) => {
      const { isFemale, isKid } = data;
      dispatch(assignIsKid(isKid));
      setCloseBottomSheet();
      handleModalOpen(isKid, isFemale);
    },
  });

  const handleModalOpen = (isKid: boolean, isFemale: boolean) => {
    openModal(modals.primaryModal, {
      onSubmit: () => {
        navigate('/auth/register/3');
      },
      isKid,
      isFemale,
      headerText: '뱅키즈 첫 가입을 축하해요',
      bodyText: '뱅키와 저금을 통해 돈길만 걸어요',
    });
  };

  const handleSubmit = (isKid: boolean, isFemale: boolean) => {
    registerMutation.mutate({ isKid, isFemale, birthday });
  };

  const openSelectProfileSheet = (isKid: boolean, isFemale: boolean) => {
    setOpenBottomSheet({
      sheetContent: 'SelectProfile',
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
    <>
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
      </Wrapper>
    </>
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
