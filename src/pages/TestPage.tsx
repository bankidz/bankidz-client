import styled from 'styled-components';
import Pending from '../components/homekid/Pending';
function TestPage() {
  // 컴포넌트 랜더링 테스트용 페이지 입니다.
  return (
    <ComponentWrapper>
      <Pending
        date={'2022-12-12 00:00:00'}
        name={'예시'}
        isSuggesting={true}
      ></Pending>
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
