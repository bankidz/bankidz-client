import { Routes, Route } from 'react-router-dom';
import Info from './Info';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';

function MypageRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <Mypage />
          </BackgroundTemplate>
        }
      />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}

export default MypageRouter;
