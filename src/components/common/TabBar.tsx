import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '../../lib/styles/theme';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Contents } from '../../assets/icons/contents.svg';
import { ReactComponent as Mypage } from '../../assets/icons/mypage.svg';
import { theme } from '../../lib/styles/theme';
import { useAppSelector } from '../../store/app/hooks';
import { selectIsKid } from '../../store/slices/authSlice';

function TabBar() {
  const isKid = useAppSelector(selectIsKid);
  const { pathname } = useLocation();
  console.log(pathname);
  const active = [theme.palette.gray[3], theme.palette.yellow[0]];

  return (
    <Wrapper>
      <NavLink to="/">
        <Home stroke={pathname === '/' ? active[1] : active[0]} />
      </NavLink>
      <NavLink to={isKid ? '/challenge' : '/contents'}>
        <Contents
          fill={
            pathname === '/challenge' || pathname === '/contents'
              ? active[1]
              : active[0]
          }
        />
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
  border: 1px solid ${({ theme }) => theme.palette.gray[1]};
  border-bottom: none;
  position: fixed;
  height: 47px;

  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px 12px 28px 28px;
  padding-bottom: 14px;

  display: flex;
  justify-content: space-around;

  width: calc(100% + 1px);
  bottom: 0px;
  left: -1px;
  border-radius: 12px 12px 0px 0px;
  padding-bottom: 0px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
