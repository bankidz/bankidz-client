import { Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import NotFound from './pages/Common/NotFound';
import Introduce from './pages/Common/Introduce';
import ChallengeRouter from './pages/Challenge';
import ContentsRouter from './pages/Contents';
import HomeRouter from './pages/Home';
import MypageRouter from './pages/Mypage';
import TestPage from './pages/TestPage';

/* 부모자식 여부를 아래로 내려주는 props에 대한 타입인데, 네이밍 고민.
각각 하위 컴포넌트에서 중복으로 만들어서 쓰는게 나으려나요 */
export type AppProps = {
  isKid: boolean;
};

function App() {
  const isKid: boolean = true;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/*" element={<HomeRouter isKid={isKid} />} />

        <Route path="/challenge/*" element={<ChallengeRouter />} />
        <Route path="/contents/*" element={<ContentsRouter />} />

        <Route path="/mypage/*" element={<MypageRouter isKid={isKid} />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      {/* 소개페이지 (레이아웃 안쓰는..예시..?) */}
      <Route path="/introduce" element={<Introduce />} />
      {/* 컴포넌트 랜더링 테스트용 페이지 입니다.*/}
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;
