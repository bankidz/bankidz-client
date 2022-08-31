import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonSetProps {
  children: ReactNode;
}

function ButtonSet({ children }: ButtonSetProps) {
  return (
    <Wrapper>
      {children}
      <Background />
    </Wrapper>
  );
}

export default ButtonSet;

const Wrapper = styled.div`
  width: 100%;
  height: 158px;

  position: relative;
  padding: 20px;
  gap: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 158px;

  background: linear-gradient(
    0deg,
    #fafafc 69.51%,
    rgba(250, 250, 252, 0.9) 76.37%,
    rgba(250, 250, 252, 0.5) 84.25%,
    rgba(250, 250, 252, 0.4) 90.44%,
    rgba(250, 250, 252, 0) 96.23%
  );
`;
