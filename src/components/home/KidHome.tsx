import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import KidSummary, {
  kidSummaryWrapperStyle,
} from '@components/home/summary/KidSummary';
import WalkingDongilSection, {
  walkingDongilWrapperStyle,
} from '@components/home/walking/WalkingDongilSection';
import PendingDongilSection, {
  pendingDongilWrapperStyle,
} from '@components/home/pending/PendingDongilSection';
import { Suspense } from 'react';
import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import styled from 'styled-components';
import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import CriticalErrorBoundary from '@components/common/errorBoundary/CriticalErrorBoundary';

function KidHome() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <KidSummary />
        <WalkingDongilSection />
        <PendingDongilSection />
      </Suspense>
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default KidHome;

function LoadingFallback() {
  return (
    <>
      <SummaryWrapper>
        <SkeletonSummary variant="KidHome" />
      </SummaryWrapper>
      <WalkingSkeletonWrapper>
        <h1>걷고있는 돈길</h1>
        <SkeletonDongilList variant="walking" />
      </WalkingSkeletonWrapper>
      <PendingSkeletonWrapper>
        <h1>대기중인 돈길</h1>
        <SkeletonDongilList variant="pending" />
      </PendingSkeletonWrapper>
    </>
  );
}

const SummaryWrapper = styled.div`
  ${kidSummaryWrapperStyle}
`;

const WalkingSkeletonWrapper = styled.section`
  ${walkingDongilWrapperStyle}
`;

const PendingSkeletonWrapper = styled.section`
  ${pendingDongilWrapperStyle}
`;
