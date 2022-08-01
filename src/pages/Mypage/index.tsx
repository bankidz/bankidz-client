import { Routes, Route } from 'react-router-dom';
import Info from './Info';
import Code from './Code';
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
      <Route path="/code" element={<Code />} />
    </Routes>
  );
}

export default MypageRouter;
