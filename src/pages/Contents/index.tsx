import { Routes, Route } from 'react-router-dom';
import Base from '../../components/layout/Base';
import Stacked from '../../components/layout/Stacked';
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
          <Base>
            <Contents />
          </Base>
        }
      />
      <Route
        path="/edu"
        element={
          <Stacked label="금융 교육 전체보기">
            <Edu />
          </Stacked>
        }
      />
      <Route
        path="/life"
        element={
          <Stacked label="금융 생할 전체보기">
            <Life />
          </Stacked>
        }
      />

      <Route
        path="/edu/:articleId"
        element={
          <Stacked label="금융 교육">
            <Article />
          </Stacked>
        }
      />
      <Route
        path="/life/:articleId"
        element={
          <Stacked label="금융 생활">
            <Article />
          </Stacked>
        }
      />
    </Routes>
  );
}

export default ContentsRouter;
