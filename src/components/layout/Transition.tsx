import React from 'react';
import { Location } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Transition = ({
  location,
  children,
}: {
  location: Location;
  children: React.ReactElement;
}) => {
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
        timeout={300}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Transition;
