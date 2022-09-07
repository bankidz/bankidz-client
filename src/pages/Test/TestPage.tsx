import styled from 'styled-components';
import AuthTest from './AuthTest';
import LocalStorageTest from './LocalStorageTest';

function TestPage() {
  return (
    <Wrapper>
      <AuthTest />
      <LocalStorageTest />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
`;
