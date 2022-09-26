import Button from '@components/common/buttons/Button';
import TextAreaForm from '@components/common/forms/TextAreaForm';
import userApi from '@lib/apis/user/userAPI';
import { APPLE_DEAUTH_URL } from '@lib/constants/APPLE_DEAUTH_URL';
import useLogoutClient from '@lib/hooks/auth/useLogoutClient';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import setLocalStorage from '@lib/utils/localStorage/setLocalStorage';
import { useAppSelector } from '@store/app/hooks';
import { selectProvider } from '@store/slices/authSlice';
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

function WithdrawReason() {
  const [reason, setReason] = useState('');

  const notice = (
    <Notice>
      <h1>탈퇴 시 유의사항은 다음과 같아요</h1>
      <ol>
        <li>
          가족 그룹에서도 삭제되며, 재가입 시 다시 가족그룹에 참여절차를
          진행해야 합니다.
        </li>
        <li>이전에 설정한 모든 돈길이 삭제되며, 다시 복구할 수 없습니다.</li>
        <li>
          현재 레벨도 모두 사라지게 되며, 재가입 시 레벨 0부터 다시 시작합니다.
        </li>
      </ol>
    </Notice>
  );

  const { setOpenBottomSheet, setCloseBottomSheet } = useGlobalBottomSheet();
  const logoutClient = useLogoutClient();
  const openWithdrawCompletedBottomSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Completed',
      sheetProps: {
        open: true,
      },
      contentProps: {
        type: 'delete',
        onMainActionClick: () => {
          setCloseBottomSheet();
          logoutClient();
        },
      },
    });
  };

  const provider = useAppSelector(selectProvider);
  const deleteMutation = useMutation(userApi.deleteUser, {
    onSuccess: () => {
      openWithdrawCompletedBottomSheet();
    },
  });
  const handleWithdrawButtonClick = () => {
    if (provider === 'kakao') {
      deleteMutation.mutate({ message: reason });
    } else if (provider === 'apple') {
      setLocalStorage('appleWithdrawReason', reason);
      window.location.href = APPLE_DEAUTH_URL;
    }
  };

  return (
    <Wrapper>
      <header>
        <h1>탈퇴하시는 이유를 알려주세요</h1>
      </header>
      <InputWrapper>
        <TextAreaForm
          placeholder="어떠한 이유든 자유롭게 작성해주세요"
          textValue={reason}
          setTextValue={setReason}
          height="168px"
          autoFocus
        />
      </InputWrapper>
      {notice}
      <DoubleButtonWrapper>
        <Button
          property="default"
          label="탈퇴하기"
          onClick={handleWithdrawButtonClick}
          state={reason !== ''}
        />
      </DoubleButtonWrapper>
    </Wrapper>
  );
}

export default WithdrawReason;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;

  header h1 {
    ${({ theme }) => theme.typo.text.T_21_EB};
    color: ${({ theme }) => theme.palette.greyScale.black};
    margin-left: 26px;
    margin-right: 26px;
    margin-top: 40px;
  }
`;

const InputWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  padding: 0px 18px;
  box-sizing: border-box;
`;

const Notice = styled.section`
  margin-top: 64px;
  margin-left: 26px;
  margin-right: 26px;
  h1 {
    ${({ theme }) => theme.typo.text.S_16_B};
    color: ${({ theme }) => theme.palette.sementic.red300};
  }
  li {
    margin-top: 12px;
    margin-left: 18px;
    ${({ theme }) => theme.typo.text.S_14_M};
    color: ${({ theme }) => theme.palette.greyScale.black};
    list-style-type: decimal;
  }
`;

const DoubleButtonWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  margin-bottom: 31px;
  padding-left: 18px;
  padding-right: 18px;
`;
