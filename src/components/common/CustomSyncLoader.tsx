import SyncLoader from 'react-spinners/SyncLoader';
import styled from 'styled-components';

function CustomSyncLoader() {
  return (
    <Wrapper>
      <SyncLoader
        size={13}
        margin={2}
        color="#DBDEE1" // grey300
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
