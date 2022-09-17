import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import KidHome from '@components/home/KidHome';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import familyApi from '@lib/apis/family/familyApi';
import { AxiosError } from 'axios';
import { IFamilyDTO } from '@lib/apis/family/family.dto';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import styled from 'styled-components';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

// 자녀홈의 계층 구조는 다음과 같습니다.
// 1. KidHomePage: 연결된 가족 fetch
// 2. 연결된 가족이 없는 경우 - NoFamily
// 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
// 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링 및 관련 데이터 fetch

function KidHomePage() {
  usePreventGoBack();
  const isKid = useAppSelector(selectIsKid);
  const {
    status,
    data: family,
    error,
  } = useQuery<IFamilyDTO, AxiosError>(queryKeys.FAMILY, familyApi.getFamily);
  // 로그인한 유저가 자녀인 경우 부모 유무를,
  // 로그인한 유저가 부모인 경우 자녀 유무를 판단합니다.
  const hasFamily = family?.familyUserList?.find(
    (member) => member.isKid === !isKid,
  );

  let content;
  if (status === 'loading') {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  } else if (
    (status === 'success' && !hasFamily) ||
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
