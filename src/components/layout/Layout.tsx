import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../lib/styles/theme';

function Layout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default Layout;
const Wrapper = styled.div`
  ${media.mobile} {
    width: 100%;
    /* min-width: 320px; */
    height: calc(var(--vh, 1vh) * 100);
  }
  width: 576px;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.lightGray};
`;
