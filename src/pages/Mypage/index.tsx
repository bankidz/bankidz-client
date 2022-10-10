import { Routes, Route, Location } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';
import ManageRouter from '../Manage';

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
