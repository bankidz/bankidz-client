import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import RouteTransition from '@components/layout/RouteTransition';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomeRouter from './Home';
import InterestRouter from './Interest';
import MypageRouter from './Mypage';
import WalkRouter from './Walk';

const ServiceRouter = () => {
  const location = useLocation();
  return (
    <BackgroundTemplate>
      <RouteTransition location={location}>
        <Routes location={location}>
          <Route path="/*" element={<HomeRouter location={location} />} />
          <Route path="/walk/*" element={<WalkRouter />} />
          <Route
            path="/mypage/*"
            element={<MypageRouter location={location} />}
          />
          <Route path="/interest/*" element={<InterestRouter />} />
        </Routes>
      </RouteTransition>
    </BackgroundTemplate>
  );
};

export default ServiceRouter;
