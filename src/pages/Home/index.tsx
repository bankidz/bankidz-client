import { Route, Routes, Navigate } from 'react-router-dom';
import HomeParent from './parent/HomeParent';
import PendingKid from './kid/PendingKid';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import HomeKid from './kid/HomeKid';
import PendingParent from './parent/PendingParent';
import CreateKid from './kid/CreateKid';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import CheckStepParams from '@components/kid/create/CheckStepParams';
import ProceedingChallenge from './ProceedingChallenge';

function HomeRouter() {
  const isKid = useAppSelector(selectIsKid);
  const level = useAppSelector(selectLevel);
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
        path="/proceeding/:challengeId"
        element={
          <ForegroundTemplate label="걷고있는 돈길" level={level}>
            <ProceedingChallenge level={level} />
          </ForegroundTemplate>
        }
      />
      <Route
        path="/create/:step"
        element={
          <CheckStepParams>
            <ForegroundTemplate label="돈길 계약하기">
              <CreateKid />
            </ForegroundTemplate>
          </CheckStepParams>
        }
      />
      <Route
        path="/create/*"
        element={
          <CheckStepParams>
            <Navigate replace to="/create/1" />
          </CheckStepParams>
        }
      />
    </Routes>
  );
}

export default HomeRouter;
