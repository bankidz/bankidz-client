import { Routes, Route } from 'react-router-dom';
import KidMypage from './KidMypage';
import ParentMypage from './ParentMypage';
import CommonInfo from './CommonInfo';
import CommonCode from './CommonCode';
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
      <Route path="/info" element={<CommonInfo />} />
      <Route path="/code" element={<CommonCode />} />
    </Routes>
  );
}

export default MypageRouter;
