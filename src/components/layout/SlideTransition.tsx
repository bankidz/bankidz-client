import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface SlideTransitionProps {
  keyValue: any;
  direction: string;
  children: React.ReactElement;
}

const SlideTransition = ({
  keyValue,
  direction,
  children,
}: SlideTransitionProps) => {
  return (
    <TransitionGroup
      style={{ position: 'relative' }}
      childFactory={(child) => {
        return React.cloneElement(child, {
          classNames: `slide-${direction}`,
        });
      }}
    >
      <CSSTransition
        key={keyValue}
        timeout={300}
        classNames={`slide-${direction}`}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SlideTransition;
