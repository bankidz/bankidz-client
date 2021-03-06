import { Route, Routes } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Walk from './Walk';

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
