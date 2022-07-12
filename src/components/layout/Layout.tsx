import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { media } from '@lib/styles/theme';
import { useMediaQuery } from 'react-responsive';

function Layout() {
  const { pathname } = useLocation();

  const isPC = useMediaQuery({ minWidth: 576 });

  return (
    <Wrapper>
      <Container>
        {isPC ? (
          <iframe
            src={pathname}
            style={{ width: '100%', height: '715px', borderRadius: '28px' }}
          ></iframe>
        ) : (
          <Outlet />
        )}
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
  background-color: ${({ theme }) => theme.palette.greyScale.white};
  box-sizing: content-box;
  border: 12px solid ${({ theme }) => theme.palette.greyScale.grey100};
  border-radius: 36px;

  /* 탭바 */
  position: relative;
`;
