import { ReactNode } from 'react';
import styled from 'styled-components';

function Margin({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Margin;

const Wrapper = styled.div`
  margin: 0px 20px;
`;
