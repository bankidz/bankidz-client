import { Suspense } from 'react';
import styled from 'styled-components';
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
import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import RetryErrorBoundary from '@components/common/errorBoundary/RetryErrorBoundary';

const SummaryWrapper = styled.div`
  ${kidSummaryWrapperStyle}
`;
const WalkingSkeletonWrapper = styled.section`
  ${walkingDongilWrapperStyle}
`;
const PendingSkeletonWrapper = styled.section`
  ${pendingDongilWrapperStyle}
`;

const kidSummarySkeleton = (
  <SummaryWrapper>
    <SkeletonSummary variant="KidHome" />
  </SummaryWrapper>
);
const walkingSkeleton = (
  <WalkingSkeletonWrapper>
    <h1>걷고있는 돈길</h1>
    <SkeletonDongilList variant="walking" />
  </WalkingSkeletonWrapper>
);
const pendingSkeleton = (
  <PendingSkeletonWrapper>
    <h1>대기중인 돈길</h1>
    <SkeletonDongilList variant="pending" />
  </PendingSkeletonWrapper>
);

function LoadingFallback() {
  return (
    <>
      {kidSummarySkeleton}
      {walkingSkeleton}
      {pendingSkeleton}
    </>
  );
}

function KidHome() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <RetryErrorBoundary background={kidSummarySkeleton}>
          <KidSummary />
        </RetryErrorBoundary>
        <RetryErrorBoundary background={walkingSkeleton}>
          <WalkingDongilSection />
        </RetryErrorBoundary>
        <RetryErrorBoundary background={pendingSkeleton}>
          <PendingDongilSection />
        </RetryErrorBoundary>
      </Suspense>
      <LargeSpacer />
    </>
  );
}

export default KidHome;
