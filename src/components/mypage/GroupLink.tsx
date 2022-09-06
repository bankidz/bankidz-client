import useFamilyApi from '@apis/family/useFamilyApi';
import useUserApi from '@apis/user/useUserAPi';
import useOpenGroupLinkSheets from '@components/mypage/useOpenGroupLinkSheets';
import { FAMILY, USER } from '@lib/constants/QUERY_KEY';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { decipher } from '@lib/utils/crypt';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useMutation, useQueries } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const GroupLink = () => {
  const navigate = useNavigate();
  const { groupCode } = useParams();
  const { code, expiredDate } = decipher(groupCode!);
  const { setCloseBottomSheet } = useGlobalBottomSheet();
  const {
    openExpiredNoticeSheet,
    openJoinGroupCheckSheet,
    openMoveGroupCheckSheet,
    openUnregisteredCheckSheet,
    openMoveGroupCompletedSheet,
  } = useOpenGroupLinkSheets();

  const { getFamily, joinFamily } = useFamilyApi();
  const { getUser } = useUserApi();
  const [family, user] = useQueries([
    { queryKey: FAMILY, queryFn: getFamily },
    { queryKey: USER, queryFn: getUser },
  ]);
  const { data: familyData, status: familyStatus } = family;
  const { data: userData, status: userStatus } = user;

  const handleSheetCompletedAction = () => {
    setCloseBottomSheet();
    navigate('/');
  };

  const handleMoveGroupCompleted = () => {
    openMoveGroupCompletedSheet(handleSheetCompletedAction);
  };

  const { mutate: MutateJoinFamily } = useMutation(joinFamily, {
    onSuccess: handleSheetCompletedAction,
  });
  const { mutate: MutateMoveFamily } = useMutation(joinFamily, {
    onSuccess: handleMoveGroupCompleted,
  });

  useEffect(() => {
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
          MutateMoveFamily({ code });
        });
      } else {
        // 4. 가족 없을때: 가족 그룹 참여
        openJoinGroupCheckSheet(() => {
          MutateJoinFamily({ code });
        });
      }
    }
  }, [userStatus, familyStatus]);

  return <></>;
};

export default GroupLink;
