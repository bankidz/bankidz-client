import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../lib/styles/theme';

function Layout() {
  return (
    <Wrapper>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  );
}

export default Layout;
const Wrapper = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* 모바일 화면 */
  ${media.mobile} {
    width: 100%;
    min-width: 320px;
    height: calc(var(--vh, 1vh) * 100);
    border: none;
    border-radius: 0px;
  }

  /* pc 모바일 목업 화면 */
  width: 360px;
  height: 714px;
  background-color: ${({ theme }) => theme.palette.lightGray};
  box-sizing: content-box;
  border: 12px solid ${({ theme }) => theme.palette.gray[1]};
  border-radius: 36px;

  /* 탭바를 위한 */
  position: relative;
`;
