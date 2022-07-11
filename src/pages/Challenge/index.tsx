import { Route, Routes } from 'react-router-dom';
import Base from '@components/layout/Base';
import Stacked from '../../components/layout/Stacked';
import Challenge from './Challenge';
import ChallengeDelete from './ChallengeDelete';

function ChallengeRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Base>
            <Challenge />
          </Base>
        }
      />
      {/* <Route
        path="/delete/:challengeId"
        element={
          <Stacked label="">
            <ChallengeDelete />
          </Stacked>
        }
      /> */}
    </Routes>
  );
}

export default ChallengeRouter;
