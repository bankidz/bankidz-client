import { Route, Routes } from 'react-router-dom';
import Challenge from './Challenge';
import ChallengeDelete from './ChallengeDelete';
import ChallengeStart from './ChallengStart';

function ChallengeRouter() {
  return (
    <Routes>
      <Route path="/" element={<Challenge />} />
      <Route path="/start" element={<ChallengeStart />} />
      <Route path="/delete/:chellengeId" element={<ChallengeDelete />} />
    </Routes>
  );
}

export default ChallengeRouter;
