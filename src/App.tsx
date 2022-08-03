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
import SungwooTestPage from './pages/SungwooTestPage';
import WalkRouter from './pages/Walk';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<OAuthRedirectHandler />} />
        <Route path="/register/:step" element={<RegisterPage />} />
        {/* <Route element={<PersistLogin />}> */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/*" element={<HomeRouter />} />
        <Route path="/walk/*" element={<WalkRouter />} />
        <Route path="/mypage/*" element={<MypageRouter />} />
        <Route path="/financial/*" element={<FinancialRouter />} />
        <Route path="/sungwoo" element={<SungwooTestPage />} />
        <Route path="*" element={<NotFound />} />
        {/* </Route>
      </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
