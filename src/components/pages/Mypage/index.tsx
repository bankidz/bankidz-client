import { Routes, Route, Location, Navigate } from 'react-router-dom';
import ManageRouter from '../Manage';
import Mypage from './Mypage';
import Enter from './Enter';
import BackgroundTemplate from '@components/atoms/layout/BackgroundTemplate';
import ForegroundTemplate from '@components/atoms/layout/ForegroundTemplate';

function MypageRouter({ location }: { location: Location }) {
  return (
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
        path="/new"
        element={<Navigate to="/mypage" state={{ newFamily: true }} />}
      />
      <Route
        path="/enter"
        element={
          <ForegroundTemplate>
            <Enter />
          </ForegroundTemplate>
        }
      />
      <Route path="/manage/*" element={<ManageRouter location={location} />} />
    </Routes>
  );
}

export default MypageRouter;
