import styled from 'styled-components';
import CommonSheet from '../components/common/bottomSheet/CommonSheet';
import DeleteChallenge from '../components/common/bottomSheet/sheetContent/DeleteChallenge';
import useBottomSheet from '../hooks/useBottomSheet';

function TestPage() {
  // 컴포넌트 랜더링 테스트용 페이지 입니다.
  const [open, onOpen, onDismiss] = useBottomSheet();
  return (
    <ComponentWrapper>
      <div style={{ width: '100%' }}>
        <button
          style={{ padding: '16px', backgroundColor: '#ddd' }}
          onClick={onOpen}
        >
          열기
        </button>
      </div>
      <CommonSheet overlay={true} open={open} onDismiss={onDismiss}>
        <DeleteChallenge onDismiss={onDismiss} onClickDelete={() => {}} />
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
