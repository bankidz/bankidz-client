import Modals from '@components/common/modals/Modals';
import LargeSpacer from '@components/layout/LargeSpacer';
import ParentSummary, {
  parentSummaryStyle,
} from '@components/home/summary/ParentSummary';
import ProposedDongilSection, {
  ProposedDongilStyle,
} from '@components/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection, {
  thisWeekSDongilStyle,
} from '@components/home/thisWeekS/ThisWeekSDongilSection';
import { Suspense } from 'react';
import styled from 'styled-components';
import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import RetryErrorBoundary from '@components/common/RetryErrorBoundary';

const ParentSummaryWrapper = styled.div`
  ${parentSummaryStyle}
`;
const ProposedSkeletonWrapper = styled.section`
  ${ProposedDongilStyle};
`;
const ThisWeekSSkeletonWrapper = styled.section`
  ${thisWeekSDongilStyle}
`;

const parentSummarySkeleton = (
  <ParentSummaryWrapper>
    <SkeletonSummary variant="ParentHome" />
  </ParentSummaryWrapper>
);
const proposedSkeleton = (
  <ProposedSkeletonWrapper>
    <h1>제안받은 돈길</h1>
    <SkeletonDongilList variant="proposed" />
  </ProposedSkeletonWrapper>
);
const thisWeekSSkeleton = (
  <ThisWeekSSkeletonWrapper>
    <h1>금주의 돈길</h1>
    <SkeletonDongilList variant="thisWeekS" />
  </ThisWeekSSkeletonWrapper>
);

function LoadingFallback() {
  return (
    <>
      {parentSummarySkeleton}
      {proposedSkeleton}
      {thisWeekSSkeleton}
    </>
  );
}

function ParentHome() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <RetryErrorBoundary background={parentSummarySkeleton}>
          <ParentSummary />
        </RetryErrorBoundary>
        <RetryErrorBoundary background={proposedSkeleton}>
          <ProposedDongilSection />
        </RetryErrorBoundary>
        <RetryErrorBoundary background={thisWeekSSkeleton}>
          <ThisWeekSDongilSection />
        </RetryErrorBoundary>
      </Suspense>
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;
