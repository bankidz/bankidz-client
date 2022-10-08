import { Routes, Route, useLocation } from 'react-router-dom';
import BackgroundTemplate from '@components/layout/BackgroundTemplate';
import Mypage from './Mypage';
import ManageRouter from '../Manage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React from 'react';

function MypageRouter() {
  const location = useLocation();
  return (
    <TransitionGroup
      className={'transition-wrapper'}
      childFactory={(child) => {
        return React.cloneElement(child, {
          classNames: location.state?.direction || 'slide',
        });
      }}
    >
      <CSSTransition
        key={location.pathname}
        classNames={location.state?.direction || 'slide'}
        timeout={400}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <BackgroundTemplate>
                <Mypage />
              </BackgroundTemplate>
            }
          />
          <Route
            path="/manage/*"
            element={<ManageRouter location={location} />}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default MypageRouter;
