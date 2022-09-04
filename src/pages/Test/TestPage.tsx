import styled from 'styled-components';
import LoadingSpinnerTest from '../../components/common/CustomSyncLoader';

function TestPage() {
  return (
    <Wrapper>
      <LoadingSpinnerTest />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  /* background: pink; */
`;
