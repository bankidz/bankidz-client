import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import KAKAOAuthRedirectPage from './KAKAOAuthRedirectPage';
import APPLEAuthRedirectPage from './APPLEAuthRedirectPage';
import RegisterPage from './RegisterPage';

function OnBoardingRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kakao/callback" element={<KAKAOAuthRedirectPage />} />
      {/* apple callback */}
      <Route path="/apple/login" element={<APPLEAuthRedirectPage />} />
      <Route path="/register/:step" element={<RegisterPage />} />
    </Routes>
  );
}

export default OnBoardingRouter;
