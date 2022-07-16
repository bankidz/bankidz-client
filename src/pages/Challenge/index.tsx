import { Route, Routes } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import ForegroundTemplate from '../../components/layout/ForegroundTemplate';
import Challenge from './Challenge';
import ChallengeDelete from './ChallengeDelete';

function ChallengeRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <BackgroundTemplate>
            <Challenge />
          </BackgroundTemplate>
        }
      />
      {/* <Route
        path="/delete/:challengeId"
        element={
          <ForegroundTemplate label="">
            <ChallengeDelete />
          </ForegroundTemplate>
        }
      /> */}
    </Routes>
  );
}

export default ChallengeRouter;
