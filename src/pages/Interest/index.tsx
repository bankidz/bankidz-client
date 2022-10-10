import { Routes, Route } from 'react-router-dom';
import BackgroundTemplate from '../../components/layout/BackgroundTemplate';
import InterestPage from './InterestPage';

function InterestRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <InterestPage />
          </>
        }
      />
    </Routes>
  );
}

export default InterestRouter;
