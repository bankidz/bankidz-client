import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import KidHome from '@components/home/KidHome';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import { AxiosError } from 'axios';
import { IFamilyDTO } from '@lib/apis/family/familyDTO';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import styled from 'styled-components';
import familyAPI from '@lib/apis/family/familyAPI';

/**
 * 자녀홈의 계층 구조는 다음과 같습니다.
 * 1. KidHomePage: 연결된 가족 fetch
 * 2. 연결된 가족이 없는 경우 - NoFamily
 * 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
 * 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링 및 관련 데이터 fetch
 */
function KidHomePage() {
  usePreventGoBack();

  const {
    status,
    data: family,
    error,
  } = useQuery<IFamilyDTO, AxiosError>(queryKeys.FAMILY, familyAPI.getFamily);

  const hasParent = family?.familyUserList?.find(
    (member) => member.isKid === false,
  );

  let content;
  if (status === 'loading') {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  } else if (
    (status === 'success' && !hasParent) ||
    (status === 'error' && error?.response?.status === 400)
  ) {
    content = <NoFamily />;
  } else if (status === 'success') {
    content = (
      <HomeTemplate>
        <KidHome />
      </HomeTemplate>
    );
  }

  return <>{content}</>;
}

export default KidHomePage;

const CustomSyncLoaderWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
