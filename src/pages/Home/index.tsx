import { Route, Routes } from 'react-router-dom';
import { AppProps } from '../../App';

import HomeParent from './parent/HomeParent';
import PendingKid from './kid/PendingKid';
import Base from '../../components/layout/Base';
import Stacked from '../../components/layout/Stacked';
import HomeKid from './kid/HomeKid';
import PendingParent from './parent/PendingParent';
import NowParent from './parent/NowParent';
import CreateKid from './kid/CreateKid';

function HomeRouter({ isKid }: AppProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={<Base>{isKid ? <HomeKid /> : <HomeParent />}</Base>}
      />
      <Route
        path="pending/:challengeId"
        element={
          isKid ? (
            <Stacked label="대기중인 돈길">
              <PendingKid />
            </Stacked>
          ) : (
            <Stacked label="제안받은 돈길">
              <PendingParent />
            </Stacked>
          )
        }
      />
      <Route
        path="/now/:challengeId"
        element={
          <Stacked label="걷고있는 돈길">
            <NowParent />
          </Stacked>
        }
      />
      <Route
        path="/create"
        element={
          <Stacked label="돈길 만들기">
            <CreateKid />
          </Stacked>
        }
      />
    </Routes>
  );
}

export default HomeRouter;
