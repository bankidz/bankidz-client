import Receipt from '@components/common/receipt/Receipt';
import MarginTemplate from '@components/layout/MarginTemplate';
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
      <MarginTemplate>
        <Receipt
          createdAt="2022/07/05 05:05:05"
          interestRate={30}
          isMom={true}
          itemName="전자제품"
          totalPrice={150000}
          weekPrice={10000}
          weeks={15}
        />
      </MarginTemplate>
      {/* <ModalTest /> */}
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  background: pink;
`;
