import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
    <>
      <div className="menu-list">
        {menus.map((menu) => (
          <MenuItem
            key={menu.destination}
            to={`/${menu.destination}`}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {menu.text}
          </MenuItem>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Layout;

const MenuItem = styled(NavLink)`
  &.active {
    font-size: bold;
    border-bottom: 1px solid;
  }

  & + & {
    margin-left: 1rem;
  }
`;
