import LoadingSpinner from '@components/common/loaders/LoadingSpinner';
import CustomThreeDots from '@components/common/loaders/CustomThreeDots';
import SkeletonInterestToPayList from '@components/common/skeletons/SkeletonInterestToPayList';
import MarginTemplate from '@components/layout/MarginTemplate';
import styled from 'styled-components';
import ModalTest from './ModalTest';

function TestPage() {
  return (
    <Wrapper>
      {/* <ModalTest /> */}
      <LoadingSpinner />
      <CustomThreeDots />
    </Wrapper>
  );
}

export default TestPage;

const Wrapper = styled.div`
  height: 1000px;
  background: pink;
`;
