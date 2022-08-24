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
  const hasNoFamily = family === null || family?.length === 0;

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
