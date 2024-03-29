import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import useOpenGroupLinkSheets from '@components/blocks/mypage/useOpenGroupLinkSheets';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { decipher } from '@lib/utils/crypt';
import useUserQuery from '@lib/hooks/queries/useUserQuery';
import familyAPI from '@lib/apis/family/familyAPI';
import useFamilyQuery from '@lib/hooks/queries/useFamilyQuery';
import useAPIError from '@lib/hooks/globalErrorHandler/useAPIError';
import useModals from '@lib/hooks/useModals';
import { modals } from '@components/atoms/modals/Modals';

function GroupLink() {
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  const {
    openExpiredNoticeSheet,
    openInvalidNoticeSheet,
    openJoinGroupCheckSheet,
    openMoveGroupCheckSheet,
    openUnregisteredCheckSheet,
    openMoveGroupCompletedSheet,
  } = useOpenGroupLinkSheets();
  const { openModal } = useModals();

  const { handleError } = useAPIError({
    401: { default: () => {} },
  });

  const { status: userStatus } = useUserQuery({
    onError: handleError,
  });
  const { data: familyData, status: familyStatus } = useFamilyQuery({
    enabled: userStatus === 'success',
  });

  const handleSheetCompletedAction = () => {
    setCloseBottomSheet();
    navigate('/mypage');
  };

  const handleInvalidNoticeAction = () => {
    setCloseBottomSheet();
    navigate('/mypage/enter');
  };

  const handleMoveGroupCompleted = () => {
    openMoveGroupCompletedSheet(handleSheetCompletedAction);
  };

  const { mutate: mutateJoinFamily } = useMutation(familyAPI.joinFamily, {
    onSuccess: () => {
      handleSheetCompletedAction();
      openModal(modals.primaryModal, {
        isFamilyCreated: true,
        headerText: '돈길을 걸을 가족이 생겼어요',
        bodyText: '이제 그룹 내 가족구성원들과 돈길을 계약해봐요!',
      });
    },
  });
  const { mutate: mutateMoveFamily } = useMutation(familyAPI.joinFamily, {
    onSuccess: handleMoveGroupCompleted,
  });

  useEffect(() => {
    try {
      const { code, expiredDate } = decipher(groupCode!);
      const expired = dayjs(expiredDate);
      const now = dayjs();

      if (expired.isBefore(now)) {
        // 1. 링크 만료되었을 때
        openExpiredNoticeSheet(handleSheetCompletedAction);
      } else if (userStatus === 'error') {
        // 2. 리프레쉬토큰 없을때 : 로그인 또는 가입하기 바텀시트
        openUnregisteredCheckSheet(handleSheetCompletedAction);
      } else if (familyStatus === 'success') {
        if (familyData.code) {
          // 3. 가족이 있을때 : 새로운 가족그룹으로 이동
          openMoveGroupCheckSheet(() => {
            mutateMoveFamily({ code });
          });
        } else {
          // 4. 가족 없을때: 가족 그룹 참여
          openJoinGroupCheckSheet(() => {
            mutateJoinFamily({ code });
          });
        }
      }
    } catch (error) {
      openInvalidNoticeSheet(handleInvalidNoticeAction);
    }
  }, [userStatus, familyStatus]);

  return <></>;
}

export default GroupLink;
