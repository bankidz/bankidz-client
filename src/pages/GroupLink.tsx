import useFamilyApi from '@lib/api/family/useFamilyApi';
import useUserApi from '@lib/api/user/useUserAPi';
import { FAMILY, USER } from '@lib/constants/queryKeyes';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useEffect } from 'react';
import { useQueries } from 'react-query';
import { useParams } from 'react-router-dom';

const GroupLink = () => {
  const { groupCode } = useParams();
  const { setOpenBottomSheet } = useGlobalBottomSheet();
  const { getFamily } = useFamilyApi();
  const { getUser } = useUserApi();
  const [family, user] = useQueries([
    { queryKey: FAMILY, queryFn: getFamily },
    { queryKey: USER, queryFn: getUser },
  ]);
  const { data: familyData, status: familyStatus } = family;
  const { data: userData, status: userStatus } = user;

  // '아직 가입이 안된 회원이에요' 바텀시트 열기
  const openUnregisteredCheckSheet = () => {
    setOpenBottomSheet({
      sheetContent: 'Check',
      sheetProps: { open: true },
      contentProps: {
        type: 'unregistered',
        onMainActionClick: () => {
          console.log('asdf');
        },
      },
    });
  };

  useEffect(() => {
    if (userStatus === 'error') {
      openUnregisteredCheckSheet();
    } else {
    }
  }, [userStatus]);

  return <></>;
};

export default GroupLink;
