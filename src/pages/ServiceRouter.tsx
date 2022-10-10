import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import RouteTransition from '@components/layout/RouteTransition';
import TabBar from '@components/layout/TabBar';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeRouter from './Home';
import InterestRouter from './Interest';
import MypageRouter from './Mypage';
import WalkRouter from './Walk';

const pageOrder = ['', '/interest', '/', '/walk', '/mypage'];

const ServiceRouter = () => {
  const location = useLocation();
  return (
    <Wrapper>
      {pageOrder.includes(location.pathname) && <TabBar />}
      <Screen>
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
      </Screen>
    </Wrapper>
  );
};

export default ServiceRouter;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Screen = styled.div`
  z-index: 0;
`;
