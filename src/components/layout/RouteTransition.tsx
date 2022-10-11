import React from 'react';
import { Location } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const pageOrder = ['/interest', '/', '/walk', '/mypage'];

const RouteTransition = ({
  location,
  children,
}: {
  location: Location;
  children: React.ReactElement;
}) => {
  const pathname = location.pathname;
  const state = location.state;

  return (
    <TransitionGroup
      className={'transition-wrapper'}
      childFactory={(child) => {
        if (!state?.prev) {
          return React.cloneElement(child, {
            classNames: location.state?.direction || 'navigate-push',
          });
        } else {
          if (pageOrder.indexOf(pathname) > pageOrder.indexOf(state.prev)) {
            return React.cloneElement(child, {
              classNames: 'none',
            });
          } else {
            return React.cloneElement(child, {
              classNames: 'none',
            });
          }
        }
      }}
    >
      <CSSTransition exact key={pathname} timeout={300}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RouteTransition;
