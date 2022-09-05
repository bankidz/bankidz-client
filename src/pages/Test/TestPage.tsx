import useRegisterEXPOToken from '@lib/hooks/useRegisterEXPOToken';
import { useEffect } from 'react';
import styled from 'styled-components';
import LoadingSpinnerTest from '../../components/common/CustomSyncLoader';
import ModalTest from './ModalTest';

function TestPage() {
  const registerEXPOToken = useRegisterEXPOToken();
  useEffect(() => {
    registerEXPOToken();
  }, []);

  return (
    <Wrapper>
      <span>here is test page</span>
      {/* <ModalTest /> */}
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: pink; */
`;
