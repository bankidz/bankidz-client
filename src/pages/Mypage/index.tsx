import { Routes, Route, useLocation } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';
import ManageRouter from '../Manage';
import RouteTransition from '@components/layout/RouteTransition';

function MypageRouter() {
  const location = useLocation();
  return (
    <RouteTransition location={location}>
      <Routes location={location}>
        <Route
          path="/"
          element={
            <BackgroundTemplate>
              <Mypage />
            </BackgroundTemplate>
          }
        />
        <Route
          path="/manage/*"
          element={<ManageRouter location={location} />}
        />
      </Routes>
    </RouteTransition>
  );
}

export default MypageRouter;
