import CustomSyncLoader from '@components/common/CustomSyncLoader';
import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import ParentHome from '@components/home/ParentHome';
import familyApi from '@lib/apis/family/familyApi';
import queryKeys from '@lib/constants/queryKeys';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useAppDispatch } from '@store/app/hooks';
import { setSelectedKid } from '@store/slices/kidsSlice';
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

  const dispatch = useAppDispatch();
  const { status, data: kids } = useQuery(
    queryKeys.FAMILY_KID,
    familyApi.getKid,
    {
      onSuccess: (data) => {
        dispatch(setSelectedKid(data[0]));
      },
    },
  );

  let content;
  if (status === 'loading') {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  } else if (status === 'success' && kids.length === 0) {
    content = <NoFamily />;
  } else if (status === 'success') {
    content = (
      <HomeTemplate>
        <ParentHome />
      </HomeTemplate>
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
