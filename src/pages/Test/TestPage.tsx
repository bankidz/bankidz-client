import styled from 'styled-components';
import LoadingSpinnerTest from '../../components/common/CustomSyncLoader';
import ModalTest from './ModalTest';

function TestPage() {
  return (
    <Wrapper>
      {/* <LoadingSpinnerTest /> */}
      <ModalTest />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  /* background: pink; */
`;
