import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Contents } from '../../assets/icons/contents.svg';
import { ReactComponent as Mypage } from '../../assets/icons/mypage.svg';
import { theme } from '../../lib/styles/theme';

interface TabBarProps {
  /**
   * 부모-자식 여부 (금융콘텐츠-돈길모아보기)
   */
  isKid: boolean;
}

function TabBar({ isKid }: TabBarProps) {
  // 현재 active된 link (0,1,2) : child 컴포넌트에 active 전달해주기 위해 직접..
  // 이걸 state로 관리할지, 아니면 navigate할때마다 dispatch해서 스토어에서 관리할지.. 아님 컴포넌트 자체를 전역으로 보여줄지
  const [activeLink, setActiveLink] = useState(0);
  const active = [theme.palette.gray[3], theme.palette.yellow[0]];

  return (
    <Wrapper>
      <NavLink to="/" onClick={() => setActiveLink(0)}>
        <Home stroke={activeLink === 0 ? active[1] : active[0]} />
      </NavLink>
      <NavLink
        to={isKid ? '/challenge' : '/contents'}
        onClick={() => setActiveLink(1)}
      >
        <Contents fill={activeLink === 1 ? active[1] : active[0]} />
      </NavLink>
      <NavLink to="/mypage" onClick={() => setActiveLink(2)}>
        <Mypage fill={activeLink === 2 ? active[1] : active[0]} />
      </NavLink>
    </Wrapper>
  );
}

export default TabBar;

const Wrapper = styled.div`
  width: calc(100% + 2px);
  height: 48px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px 12px 0px 0px;

  /* 테두리 위에만 */
  border: 1px solid ${({ theme }) => theme.palette.gray[1]};
  position: fixed;
  bottom: -1px;
  left: -1px;

  display: flex;
  justify-content: space-around;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
