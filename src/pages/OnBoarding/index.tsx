import { Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import KAKAOAuthRedirectPage from './KAKAOAuthRedirectPage';
import APPLEAuthRedirectPage from './APPLEAuthRedirectPage';
import RegisterPage from './RegisterPage';

function OnBoardingRouter() {
  console.log('여기');
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kakao/callback" element={<KAKAOAuthRedirectPage />} />
      <Route path="/apple/callback" element={<APPLEAuthRedirectPage />} />
      <Route path="/register/:step" element={<RegisterPage />} />
    </Routes>
  );
}

export default OnBoardingRouter;
