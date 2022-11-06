import { Location, Route, Routes } from 'react-router-dom';
import KidHomePage from './KidHomePage';
import ParentHomePage from './ParentHomePage';
import Create from './Create';
import DetailPage from './DetailPage';
import Reject from './Reject';
import Notification from './Notification';
import useLevel from '@lib/hooks/useLevel';
import { selectIsKid } from '@store/slices/authSlice';
import { useAppSelector } from '@store/app/hooks';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ThemeColor from '@components/common/ThemeColor';
import getColorByLevel from '@lib/utils/get/getColorByLevel';

function HomeRouter({ location }: { location: Location }) {
  const isKid = useAppSelector(selectIsKid);
  const level = useLevel();
  return (
    <>
      <ThemeColor color={getColorByLevel(level)} />
      <Routes location={location}>
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
        <Route path="/create" element={<Create />} />
        {/* 자녀 / 부모 - 걷고있는 돈길 / 금주의 돈길 */}
        <Route
          path="/detail/:id"
          element={
            <ForegroundTemplate
              label={isKid === true ? '걷고있는 돈길' : '금주의 돈길'}
              level={level}
              to="/"
            >
              <DetailPage />
            </ForegroundTemplate>
          }
        />
        {/* 부모 - 완주한 돈길 */}
        <Route
          path="/detail/achieved/:id"
          element={
            <ForegroundTemplate
              label={'완주한 돈길'}
              level={level}
              to="/interest"
            >
              <DetailPage />
            </ForegroundTemplate>
          }
        />
        {/* 부모 - 이자내역 걷고있는 돈길 */}
        <Route
          path="/detail/interest/:id"
          element={
            <ForegroundTemplate
              label={'걷고있는 돈길'}
              level={level}
              to="/interest"
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
        <Route path="notification" element={<Notification />} />
      </Routes>
    </>
  );
}

export default HomeRouter;
