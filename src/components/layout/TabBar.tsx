import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Home } from '@assets/icon/home.svg';
import { ReactComponent as CenterSelected } from '@assets/icon/tabbar_center_selected.svg';
import { ReactComponent as Center } from '@assets/icon/tabbar_center.svg';
import { ReactComponent as Content } from '@assets/icon/tabbar_contents.svg';
import { ReactComponent as Mypage } from '@assets/icon/mypage.svg';
import { theme } from '@lib/styles/theme';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

function TabBar() {
  const isKid = useAppSelector(selectIsKid);
  const { pathname } = useLocation();
  const active = [
    theme.palette.greyScale.grey300,
    theme.palette.main.yellow400,
  ];

  return (
    <Wrapper>
      <NavLink to={isKid ? '/' : '/contents'}>
        {isKid ? (
          <Home stroke={pathname === '/' ? active[1] : active[0]} />
        ) : (
          <Content stroke={pathname === '/contents' ? active[1] : active[0]} />
        )}
      </NavLink>
      <NavLink to={isKid ? '/challenge' : '/'}>
        {(isKid && pathname === '/challenge') ||
        (!isKid && pathname === '/') ? (
          <CenterSelected />
        ) : (
          <Center />
        )}
      </NavLink>
      <NavLink to="/mypage">
        <Mypage fill={pathname === '/mypage' ? active[1] : active[0]} />
      </NavLink>
    </Wrapper>
  );
}

export default TabBar;

const Wrapper = styled.div`
  /* 테두리 위에만 */
  border: 1px solid ${({ theme }) => theme.palette.greyScale.grey100};
  border-bottom: none;
  position: fixed;
  height: 47px;

  background-color: white;
  border-radius: 12px 12px 28px 28px;

  display: flex;
  justify-content: space-around;

  width: calc(100% + 1px);
  bottom: 0px;
  left: -1px;
  border-radius: 12px 12px 0px 0px;
  padding-bottom: 14px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > a:not(:nth-child(2)) {
    width: 48px;
  }

  & > a:nth-child(2) {
    margin-bottom: 17px;
  }
`;
