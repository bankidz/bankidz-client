import { Route, Routes } from 'react-router-dom';
import HomeParent from './parent/HomeParent';
import PendingKid from './kid/PendingKid';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import HomeKid from './kid/HomeKid';
import PendingParent from './parent/PendingParent';
import NowParent from './parent/NowParent';
import CreateKid from './kid/CreateKid';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

function HomeRouter() {
  const isKid = useAppSelector(selectIsKid);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            {isKid ? <HomeKid /> : <HomeParent />}
          </BackgroundTemplate>
        }
      />
      <Route
        path="pending/:challengeId"
        element={
          isKid ? (
            <ForegroundTemplate label="대기중인 돈길">
              <PendingKid />
            </ForegroundTemplate>
          ) : (
            <ForegroundTemplate label="제안받은 돈길">
              <PendingParent />
            </ForegroundTemplate>
          )
        }
      />
      <Route
        path="/now/:challengeId"
        element={
          <ForegroundTemplate label="걷고있는 돈길">
            <NowParent />
          </ForegroundTemplate>
        }
      />
      <Route
        path="/create/:step"
        element={
          <ForegroundTemplate label="돈길 계약하기">
            <CreateKid />
          </ForegroundTemplate>
        }
      />
    </Routes>
  );
}

export default HomeRouter;
