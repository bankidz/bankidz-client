import styled from 'styled-components';
import InterestBadge from '../components/challenge/InterestBadge';
import ChallengeBadge, {
  TargetBadge,
} from '../components/challenge/TargetBadge';

function TestPage() {
  // 컴포넌트 랜더링 테스트용 페이지 입니다.
  return (
    <ComponentWrapper>
      <TargetBadge targetSaving={100000} />
      <InterestBadge interestRate={10} />
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
