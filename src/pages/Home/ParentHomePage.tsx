import CustomSyncLoader from '@components/common/loadingSpinners/CustomSyncLoader';
import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import ParentHome from '@components/home/ParentHome';
import familyAPI from '@lib/apis/family/familyAPI';
import queryKeys from '@lib/constants/queryKeys';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  selectHasMultipleKids,
  selectSelectedKid,
  setHasMultipleKids,
  setSelectedKid,
} from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled from 'styled-components';

/**
 * 부모홈의 계층 구조는 다음과 같습니다.
 * 1. ParentHomePage: 연결된 자녀, 첫번째 자녀 데이터 fetch
 * 2. 연결된 가족이 없는 경우 - NoFamily
 * 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
 * 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링
 * 선택한 자녀 데이터 추가 fetch 및 caching
 */
function ParentHomePage() {
  usePreventGoBack();

  const selectedKid = useAppSelector(selectSelectedKid);
  const hasMultipleKids = useAppSelector(selectHasMultipleKids);
  const dispatch = useAppDispatch();
  const { status, data: kids } = useQuery(
    queryKeys.FAMILY_KID,
    familyAPI.getKid,
    {
      onSuccess: (data) => {
        selectedKid === undefined && dispatch(setSelectedKid(data[0]));
        if (hasMultipleKids === undefined) {
          if (data.length >= 2) {
            dispatch(setHasMultipleKids(true));
          } else {
            dispatch(setHasMultipleKids(false));
          }
        }
      },
    },
  );

  let content;
  if (status === 'success') {
    if (kids.length === 0) {
      content = <NoFamily />;
    } else {
      content = (
        <HomeTemplate>
          <ParentHome />
        </HomeTemplate>
      );
    }
  } else {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  }

  return <>{content}</>;
}

export default ParentHomePage;

const CustomSyncLoaderWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
