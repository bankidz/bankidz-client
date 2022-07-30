import { Routes, Route } from 'react-router-dom';
import KidMypage from './KidMypage';
import ParentMypage from './ParentMypage';
import Info from './Info';
import Code from './Code';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

function MypageRouter() {
  const isKid = useAppSelector(selectIsKid);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            {isKid ? <KidMypage /> : <ParentMypage />}
          </BackgroundTemplate>
        }
      />
      <Route path="/info" element={<Info />} />
      <Route path="/code" element={<Code />} />
    </Routes>
  );
}

export default MypageRouter;
