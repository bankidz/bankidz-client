import styled from 'styled-components';
import SuggestBadge from '../components/badges/SuggestBadge';

function TestPage() {
  return (
    <ComponentWrapper>
      <SuggestBadge isSuggesting={true} />
      <SuggestBadge isSuggesting={false} />
      <span>컴포넌트 랜더링 테스트용 페이지 입니다.</span>
    </ComponentWrapper>
  );
}

export default TestPage;

const ComponentWrapper = styled.div``;
