import { Routes, Route } from 'react-router-dom';
import BackgroundTemplate from '../../components/layout/BackgroundTemplate';
import ForegroundTemplate from '../../components/layout/ForegroundTemplate';
import Article from './Article';
import Contents from './Contents';
import Edu from './Edu';
import Life from './Life';

function ContentsRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <Contents />
          </BackgroundTemplate>
        }
      />
      <Route
        path="/edu"
        element={
          <ForegroundTemplate label="금융 교육 전체보기">
            <Edu />
          </ForegroundTemplate>
        }
      />
      <Route
        path="/life"
        element={
          <ForegroundTemplate label="금융 생할 전체보기">
            <Life />
          </ForegroundTemplate>
        }
      />

      <Route
        path="/edu/:articleId"
        element={
          <ForegroundTemplate label="금융 교육">
            <Article />
          </ForegroundTemplate>
        }
      />
      <Route
        path="/life/:articleId"
        element={
          <ForegroundTemplate label="금융 생활">
            <Article />
          </ForegroundTemplate>
        }
      />
    </Routes>
  );
}

export default ContentsRouter;
