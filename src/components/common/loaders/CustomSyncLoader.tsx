import { theme } from '@lib/styles/theme';
import SyncLoader from 'react-spinners/SyncLoader';
import styled from 'styled-components';

/**
 * 로그인 리다이랙트 시 사용합니다.
 */
function CustomSyncLoader() {
  return (
    <Wrapper>
      <SyncLoader
        size={13}
        margin={2}
        color={theme.palette.main.yellow400}
        loading={true}
        speedMultiplier={0.7}
      />
    </Wrapper>
  );
}

export default CustomSyncLoader;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
