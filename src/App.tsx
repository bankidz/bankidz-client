import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/OnBoarding/LoginPage';
import OAuthRedirectHandler from './pages/OnBoarding/OAuthRedirectHandler';
import RegisterPage from './pages/OnBoarding/RegisterPage';
import HomeRouter from './pages/Home';
import MypageRouter from './pages/Mypage';
import FinancialRouter from './pages/Financial';
import NotFound from './pages/NotFound';
import RequireAuth from '@components/auth/RequireAuth';
import PersistLogin from '@components/auth/PersistLogin';
import WalkRouter from './pages/Walk';
import { useEffect } from 'react';

function App() {
  //뷰포트 크기 바뀌는것 감지
  useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    return () => {
      // cleanup
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<OAuthRedirectHandler />} />
        <Route path="/register/:step" element={<RegisterPage />} />
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/walk/*" element={<WalkRouter />} />
          <Route path="/mypage/*" element={<MypageRouter />} />
          <Route path="/financial/*" element={<FinancialRouter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
