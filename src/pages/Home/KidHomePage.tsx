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

// 자녀홈의 계층 구조는 다음과 같습니다.
// 1. KidHomePage: 연결된 가족 fetch
// 2. 연결된 가족이 없는 경우 - NoFamily
// 2. 연결된 가족이 있는 경우 - HomeTemplate: FixedBar, Background 랜더링
// 3. ParentHome: FixedBar, Background 제외 UI 요소 랜더링 및 관련 데이터 fetch

function KidHomePage() {
  const familyStatus = useAppSelector(selectFamilyStatus);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    async function dispatchFetchFamily() {
      try {
        familyStatus === 'idle' &&
          (await dispatch(fetchFamily({ axiosPrivate })).unwrap());
      } catch (error: any) {
        console.log(error);
      }
    }
    dispatchFetchFamily();
  }, []);

  const family = useAppSelector(selectFamily);
  const hasNoFamily = family?.length === 0 && familyStatus === 'succeeded';

  usePreventGoBack();

  return (
    <>
      {hasNoFamily ? (
        <NoFamily />
      ) : (
        <HomeTemplate>
          <KidHome />
        </HomeTemplate>
      )}
    </>
  );
}

export default KidHomePage;
