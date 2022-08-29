import useOpenGroupLinkSheets from '@components/mypage/useOpenGroupLinkSheets';
import useFamilyApi from '@lib/api/family/useFamilyApi';
import useUserApi from '@lib/api/user/useUserAPi';
import { FAMILY, USER } from '@lib/constants/queryKeyes';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { decipher } from '@lib/utils/crypt';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';

const GroupLink = () => {
  const { groupCode } = useParams();
  const { code, expiredDate } = decipher(groupCode!);

  const { getFamily } = useFamilyApi();
  const { getUser } = useUserApi();
  const [family, user] = useQueries([
    { queryKey: FAMILY, queryFn: getFamily },
    { queryKey: USER, queryFn: getUser },
  ]);
  const { data: familyData, status: familyStatus } = family;
  const { data: userData, status: userStatus } = user;

  const {
    openExpiredNoticeSheet,
    openJoinGroupCheckSheet,
    openMoveGroupCheckSheet,
    openUnregisteredCheckSheet,
  } = useOpenGroupLinkSheets();

  const onRegisterButtonClick = () => {};
  const onMoveGroupButtonClick = () => {};
  const onJoinGroupButtonClick = () => {};

  useEffect(() => {
    if (userStatus === 'error') {
      // 리프레쉬토큰 없을때 : 로그인 또는 가입하기 바텀시트
      openUnregisteredCheckSheet(onRegisterButtonClick);
    } else if (familyStatus === 'success') {
      const expired = dayjs(expiredDate);
      const now = dayjs();

      if (expired.isBefore(now)) {
        // 링크 만료되었을 때
        openExpiredNoticeSheet();
      } else {
        if (familyData.code) {
          // 가족이 있을때 : 새로운 가족그룹으로 이동
          openMoveGroupCheckSheet(onMoveGroupButtonClick);
        } else {
          // 가족 없을때: 가족 그룹 참여
          openJoinGroupCheckSheet(onJoinGroupButtonClick);
        }
      }
    }
  }, [userStatus, familyStatus]);

  return <></>;
};

export default GroupLink;
