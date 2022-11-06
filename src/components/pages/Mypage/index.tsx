import { Routes, Route, Location } from 'react-router-dom';
import ManageRouter from '../Manage';
import Mypage from './Mypage';
import BackgroundTemplate from '@components/shared/layout/BackgroundTemplate';

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
      <Route path="/manage/*" element={<ManageRouter location={location} />} />
    </Routes>
  );
}

export default MypageRouter;