import styled from 'styled-components';
import CommonSheet from '../components/common/bottomSheet/CommonSheet';
function TestPage() {
  // 컴포넌트 랜더링 테스트용 페이지 입니다.
  return (
    <ComponentWrapper>
      <CommonSheet overlay={true}>
        <div style={{ height: '200px' }}></div>
      </CommonSheet>
    </ComponentWrapper>
  );
}

export default TestPage;

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
