import SkeletonInterestToPayList from '@components/common/skeletons/SkeletonInterestToPayList';
import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';

function TestPage() {
  return (
    <Wrapper>
      <MarginTemplate>
        <SkeletonInterestToPayList />
      </MarginTemplate>
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  background: pink;
`;
