import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../lib/styles/theme';
const menus = [
  {
    destination: '',
    text: 'Home',
  },
  {
    destination: 'my',
    text: 'My',
  },
  {
    destination: 'settings',
    text: 'Settings',
  },
];

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
    min-width: 320px;
  }
  width: 576px;

  background-color: ${({ theme }) => theme.palette.lightGray};
  height: 100vh;
`;
