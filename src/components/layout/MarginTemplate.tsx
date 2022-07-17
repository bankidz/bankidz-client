import { ReactNode } from 'react';
import styled from 'styled-components';

// 디자인 시스템에 맞추어 좌우 18px margin을 부여하는 template
function MarginTemplate({ children }: { children: ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default MarginTemplate;

/* 마진으로 쓰고 패딩 박아버리기 */
const Wrapper = styled.div`
  width: 100%;
  padding: 0px 18px;
  box-sizing: border-box;
`;
