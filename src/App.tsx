import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFound from './pages/Common/NotFound';
import Introduce from './pages/Common/Introduce';
import ChallengeRouter from './pages/Challenge';
import ContentsRouter from './pages/Contents';
import HomeRouter from './pages/Home';
import MypageRouter from './pages/Mypage';
import TestPage from './pages/TestPage';
import { useAppSelector } from './store/app/hooks';
import { selectIsKid } from './store/slices/authSlice';
import Init from './pages/OnBoarding/Init';
import SungwooTestPage from './pages/SungwooTestPage';
import LoginPage from './pages/OnBoarding/LoginPage';

/* 부모자식 여부를 아래로 내려주는 props에 대한 타입인데, 네이밍 고민.
각각 하위 컴포넌트에서 중복으로 만들어서 쓰는게 나으려나요 */
export type AppProps = {
  isKid: boolean;
};

function App() {
  const isKid = useAppSelector(selectIsKid);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        {isKid == null ? (
          /* 임시!!! 회원가입 완료 안되어있으면 무조건 init 페이지로.
          일단 이렇게 해놨고 나중에 hoc로 변경 예정 */
          <Route path="/*" element={<Init />} />
        ) : (
          <>
            <Route path="/*" element={<HomeRouter isKid={isKid} />} />
            <Route path="/challenge/*" element={<ChallengeRouter />} />
            <Route path="/contents/*" element={<ContentsRouter />} />
            <Route path="/mypage/*" element={<MypageRouter isKid={isKid} />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
        {/* 컴포넌트 랜더링 테스트용 페이지 입니다.*/}
        <Route path="/test" element={<TestPage />} />
        <Route path="/sungwoo" element={<SungwooTestPage />} />
      </Route>
      {/* 소개페이지 (레이아웃 안쓰는..예시..?) */}
      <Route path="/introduce" element={<Introduce />} />
    </Routes>
  );
}

export default App;
