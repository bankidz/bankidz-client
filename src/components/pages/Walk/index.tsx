import { Route, Routes } from 'react-router-dom';
import Walk from './Walk';
import BackgroundTemplate from '@components/shared/layout/BackgroundTemplate';

function WalkRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <Walk />
          </BackgroundTemplate>
        }
      />
    </Routes>
  );
}

export default WalkRouter;
