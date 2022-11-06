import { Suspense } from 'react';
import styled from 'styled-components';
import LargeSpacer from '@components/shared/layout/LargeSpacer';
import ParentSummary, {
  parentSummaryStyle,
} from '@components/blocks/home/summary/ParentSummary';
import ProposedDongilSection, {
  ProposedDongilStyle,
} from '@components/blocks/home/proposed/ProposedDongilSection';
import ThisWeekSDongilSection, {
  thisWeekSDongilStyle,
} from '@components/blocks/home/thisWeekS/ThisWeekSDongilSection';
import SkeletonSummary from '@components/shared/skeletons/SkeletonSummary';
import SkeletonDongilList from '@components/shared/skeletons/SkeletonDongilList';
import RetryErrorBoundary from '@components/shared/errorBoundary/RetryErrorBoundary';

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
    </>
  );
}

export default ParentHome;
