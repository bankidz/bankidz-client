import { Route, Routes } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid, selectLevel } from '@store/slices/authSlice';
import KidHomePage from './KidHomePage';
import ParentHomePage from './ParentHomePage';
import Create from './Create';
import DetailPage from './DetailPage';
import Reject from './Reject';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import useLevel from '@lib/hooks/useLevel';

function HomeRouter() {
  const isKid = useAppSelector(selectIsKid);
  const level = useLevel();

  return (
    <Routes>
      {/* 자녀 / 부모 - 홈 */}
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            {isKid === true ? <KidHomePage /> : <ParentHomePage />}
          </BackgroundTemplate>
        }
      />
      {/* 자녀 - 돈길 계약하기 */}
      <Route
        path="/create/:step"
        element={
          <ForegroundTemplate label="돈길 계약하기">
            <Create />
          </ForegroundTemplate>
        }
      />
      {/* 자녀 / 부모 - 걷고있는 돈길 / 금주의 돈길 */}
      <Route
        path="/detail/:id"
        element={
          <ForegroundTemplate
            label={isKid === true ? '걷고있는 돈길' : '금주의 돈길'}
            level={level}
          >
            <DetailPage />
          </ForegroundTemplate>
        }
      />
      {/* 부모 - 대기중인 돈길 */}
      {/* 자녀의 대기중인 돈길은 별도의 라우팅 없이 모달 / 바텀시트 팝업으로 처리 */}
      <Route
        path="reject/:id"
        element={isKid ? <>부적절한 접근입니다.</> : <Reject />}
      />
    </Routes>
  );
}

export default HomeRouter;
