import { Route, Routes } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import KidHome from './KidHome';
import ParentHome from './ParentHome';
import KidCreate from './KidCreate';
import KidWalking from './KidWalking';
import ParentPending from './ParentPending';

function HomeRouter() {
  const isKid = useAppSelector(selectIsKid);
  const level = useAppSelector(selectLevel);
  return (
    <Routes>
      {/* 자녀 / 부모 - 홈 */}
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            {isKid === true ? <KidHome level={level} /> : <ParentHome />}
          </BackgroundTemplate>
        }
      />
      {/* 자녀 - 돈길 계약하기 */}
      <Route
        path="/create/:step"
        element={
          <ForegroundTemplate label="돈길 계약하기">
            <KidCreate />
          </ForegroundTemplate>
        }
      />
      {/* 자녀 - 걷고있는 돈길 */}
      <Route
        path="/walking/:challengeId"
        element={
          <ForegroundTemplate label="걷고있는 돈길" level={level}>
            <KidWalking />
          </ForegroundTemplate>
        }
      />
      {/* 부모 - 대기중인 돈길 */}
      {/* 자녀의 대기중인 돈길은 별도의 라우팅 없이 모달 / 바텀시트 팝업으로 처리 */}
      <Route
        path="pending/:challengeId"
        element={
          isKid ? (
            <>부적절한 접근입니다.</>
          ) : (
            <ForegroundTemplate label="제안받은 돈길">
              <ParentPending />
            </ForegroundTemplate>
          )
        }
      />
    </Routes>
  );
}

export default HomeRouter;
