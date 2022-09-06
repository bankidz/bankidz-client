import styled from 'styled-components';
import AuthTest from './AuthTest';

function TestPage() {
  return (
    <Wrapper>
      <AuthTest />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
`;
