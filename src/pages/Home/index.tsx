import { Route, Routes, Navigate } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';
import CheckStepParams from '@components/kid/create/CheckStepParams';
import CommonWalkingMoneyRoad from './CommonWalkingMoneyRoad';
import KidHome from './KidHome';
import ParentHome from './ParentHome';
import KidPendingMoneyRoad from './KidPendingMoneyRoad';
import ParentPendingMoneyRoad from './ParentPendingMoneyRoad';
import KidCreate from './KidCreate';

function HomeRouter() {
  const isKid = useAppSelector(selectIsKid);
  return (
    <Routes>
      {/* 홈 */}
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            {isKid === true ? <KidHome /> : <ParentHome />}
          </BackgroundTemplate>
        }
      />
      {/* 걷고있는 돈길 */}
      <Route
        path="/walking/:challengeId"
        element={
          <ForegroundTemplate label="걷고있는 돈길">
            <CommonWalkingMoneyRoad />
          </ForegroundTemplate>
        }
      />
      {/* 대기중인 돈길 */}
      <Route
        path="pending/:challengeId"
        element={
          isKid === true ? (
            // <ForegroundTemplate label="대기중인 돈길">
            <KidPendingMoneyRoad />
          ) : (
            // </ForegroundTemplate>
            <ForegroundTemplate label="제안받은 돈길">
              <ParentPendingMoneyRoad />
            </ForegroundTemplate>
          )
        }
      />
      {/* 새로운 돈길 계약하기 */}
      <Route
        path="/create/:step"
        element={
          <CheckStepParams>
            <ForegroundTemplate label="돈길 계약하기">
              <KidCreate />
            </ForegroundTemplate>
          </CheckStepParams>
        }
      />
      {/* ??? */}
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
