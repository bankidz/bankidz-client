import styled from 'styled-components';
import CommonSheet from '../components/common/bottomSheet/CommonSheet';
function TestPage() {
  // 컴포넌트 랜더링 테스트용 페이지 입니다.
  return (
    <ComponentWrapper>
      <div style={{ width: '100%' }}>
        <div>dd</div>
        <div>dd</div>
      </div>
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
  overflow: scroll;
  display: flex;
  justify-content: space-between;
  align-items: center;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
