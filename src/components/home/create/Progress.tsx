import { useState } from 'react';
import styled, { css } from 'styled-components';

interface ProgressProps {
  // TODO: TStep 빼는게?
  step: 1 | 2 | 3 | 4 | 5;
  skipSelectParents: boolean;
}

function Progress({ step, skipSelectParents }: ProgressProps) {
  const fill = [false, false, false, false, false].map((v, i) =>
    i < step ? true : false,
  );

  return (
    <Wrapper skipSelectParents={skipSelectParents}>
      <Circle isFilled={fill[0]}></Circle>
      <Circle isFilled={fill[1]}></Circle>
      <Circle isFilled={fill[2]}></Circle>
      <Circle isFilled={fill[3]}></Circle>
      {!skipSelectParents && <Circle isFilled={fill[4]}></Circle>}
    </Wrapper>
  );
}

export default Progress;

const Wrapper = styled.div<{ skipSelectParents: boolean }>`
  width: ${({ skipSelectParents }) => (skipSelectParents ? '112px' : '144px')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div:not(:last-of-type) {
    position: relative;
  }

  & > div:not(:last-of-type):after {
    content: '';
    width: 16px;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.greyScale.grey300};
    position: absolute;
    left: 14px;
    top: 5px;
  }
`;

const Circle = styled.div<{ isFilled: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.palette.greyScale.grey300};
  box-sizing: border-box;

  ${({ isFilled }) =>
    isFilled &&
    css`
      background-color: ${({ theme }) => theme.palette.main.yellow200};
    `}
`;
