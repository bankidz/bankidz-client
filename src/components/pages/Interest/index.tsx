import { Routes, Route } from 'react-router-dom';
import BackgroundTemplate from '../../atoms/layout/BackgroundTemplate';
import InterestPage from './InterestPage';

function InterestRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <InterestPage />
          </BackgroundTemplate>
        }
      />
    </Routes>
  );
}

export default InterestRouter;
