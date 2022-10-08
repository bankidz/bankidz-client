import { Routes, Route, useLocation } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';
import ManageRouter from '../Manage';
import Transition from '@components/layout/Transition';

function MypageRouter() {
  const location = useLocation();
  return (
    <Transition location={location}>
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
    </Transition>
  );
}

export default MypageRouter;
