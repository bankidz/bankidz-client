import styled from 'styled-components';
import SuggestBadge from '../components/badges/SuggestBadge';
import ProfileButton from '../components/onboarding/ProfileButton';
import { darken, lighten } from 'polished';

function TestPage() {
  return (
    <ComponentWrapper>
      <button>Sample</button>
      <ProfileButton role="아빠" />
      <ProfileButton role="엄마" isSelected={true} />
      <SuggestBadge isSuggesting={true} />
      <SuggestBadge isSuggesting={false} />
      <span>컴포넌트 랜더링 테스트용 페이지 입니다.</span>
    </ComponentWrapper>
  );
}

export default TestPage;

const ComponentWrapper = styled.div``;
