import { ReactNode } from 'react';
import styled from 'styled-components';

function Margin({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Margin;

/* 마진으로 쓰고 패딩 박아버리기 */
const Wrapper = styled.div`
  width: 100%;
  padding: 0px 18px;
`;
