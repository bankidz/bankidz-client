import styled from 'styled-components';
import LocalStorageTest from './LocalStorageTest';

function TestPage() {
  return (
    <Wrapper>
      <LocalStorageTest />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
`;
