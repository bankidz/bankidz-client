import { Route, Routes } from 'react-router-dom';
import HomeKid from './HomeKid';
import HomeParent from './HomeParent';
import PendingKid from './PendingKid';
import PendingParent from './PendingParent';
import { AppProps } from '../../App';

function HomeRouter({ isKid }: AppProps) {
  return (
    <Routes>
      <Route path="/" element={isKid ? <HomeKid /> : <HomeParent />} />
      <Route
        path="pending/:challengeId"
        element={isKid ? <PendingKid /> : <PendingParent />}
      />
    </Routes>
  );
}

export default HomeRouter;
