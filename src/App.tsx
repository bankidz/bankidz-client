import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/OnBoarding/LoginPage';
import OAuthRedirectHandler from './pages/OnBoarding/OAuthRedirectHandler';
import RegisterPage from './pages/OnBoarding/RegisterPage';
import RequireAuth from '@components/auth/RequireAuth';
import HomeRouter from './pages/Home';
import ChallengeRouter from './pages/Challenge';
import ContentsRouter from './pages/Contents';
import MypageRouter from './pages/Mypage';
import NotFound from './pages/Common/NotFound';
import SungwooTestPage from './pages/SungwooTestPage';
import PersistLogin from '@components/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<OAuthRedirectHandler />} />
        {/* <Route element={<PersistLogin />}> */}
        <Route path="/register/*" element={<RegisterPage />} />
        {/* <Route element={<RequireAuth />}> */}
        <Route path="/*" element={<HomeRouter />} />
        <Route path="/challenge/*" element={<ChallengeRouter />} />
        <Route path="/contents/*" element={<ContentsRouter />} />
        <Route path="/mypage/*" element={<MypageRouter />} />
        {/* </Route> */}
        <Route path="/sungwoo" element={<SungwooTestPage />} />
        <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
