import { Routes, Route } from 'react-router-dom';
import Article from './Article';
import Contents from './Contents';
import Edu from './Edu';
import Life from './Life';

function ContentsRouter() {
  return (
    <Routes>
      <Route path="/" element={<Contents />} />
      <Route path="/edu" element={<Edu />} />
      <Route path="/life" element={<Life />} />

      <Route path="/edu/:articleId" element={<Article />} />
      <Route path="/life/:articleId" element={<Article />} />
    </Routes>
  );
}

export default ContentsRouter;
