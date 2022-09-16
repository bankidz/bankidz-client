import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import NoFamily from '@components/home/NoFamily';
import KidHome from '@components/home/KidHome';
import useAxiosPrivate from '@lib/hooks/auth/useAxiosPrivate';
import { useAppDispatch, useAppSelector } from '@store/app/hooks';
import {
  fetchFamily,
  selectFamily,
  selectFamilyStatus,
} from '@store/slices/familySlice';
import { useEffect } from 'react';
import usePreventGoBack from '@lib/hooks/usePreventGoBack';
import { useQuery } from 'react-query';
import queryKeys from '@lib/constants/queryKeys';
import familyApi from '@lib/apis/family/familyApi';
import { AxiosError } from 'axios';
import { IFamilyDTO } from '@lib/apis/family/family.dto';
import CustomSyncLoader from '@components/common/CustomSyncLoader';
import styled from 'styled-components';

// 자녀홈의 계층 구조는 다음과 같습니다.
// 1. KidHomePage: 연결된 가족 fetch
// 2. 연결된 가족이 없는 경우 - NoFamily
// 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
// 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링 및 관련 데이터 fetch

function KidHomePage() {
  usePreventGoBack();
  const {
    status,
    data: family,
    error,
  } = useQuery<IFamilyDTO, AxiosError>(queryKeys.FAMILY, familyApi.getFamily);
  const hasNoFamily = family?.familyUserList.length === 0;

  let content;
  if (status === 'loading') {
    content = (
      <CustomSyncLoaderWrapper>
        <CustomSyncLoader />
      </CustomSyncLoaderWrapper>
    );
  } else if (
    (status === 'success' && hasNoFamily) ||
    (status === 'error' && error?.response?.status === 400)
  ) {
    content = <NoFamily />;
  } else if (status === 'success' && !hasNoFamily) {
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
