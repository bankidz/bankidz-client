import { Routes, Route } from 'react-router-dom';
import BackgroundTemplate from '../../components/layout/BackgroundTemplate';
import InterestHistoryPage from './InterestHistoryPage';

function InterestHistoryRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <InterestHistoryPage />
          </BackgroundTemplate>
        }
      />
    </Routes>
  );
}

export default InterestHistoryRouter;
