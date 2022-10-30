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

function ParentHome() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <ParentSummary />
        <ProposedDongilSection />
        <ThisWeekSDongilSection />
      </Suspense>
      <LargeSpacer />
      <Modals />
    </>
  );
}

export default ParentHome;

function LoadingFallback() {
  return (
    <>
      <ParentSummaryWrapper>
        <SkeletonSummary variant="ParentHome" />
      </ParentSummaryWrapper>
      <ProposedSkeletonWrapper>
        <SkeletonDongilList variant="proposed" />
      </ProposedSkeletonWrapper>
      <ThisWeekSSkeletonWrapper>
        <SkeletonDongilList variant="thisWeekS" />
      </ThisWeekSSkeletonWrapper>
    </>
  );
}

const ParentSummaryWrapper = styled.div`
  ${parentSummaryStyle}
`;

const ProposedSkeletonWrapper = styled.section`
  ${ProposedDongilStyle};
`;

const ThisWeekSSkeletonWrapper = styled.section`
  ${thisWeekSDongilStyle}
`;
