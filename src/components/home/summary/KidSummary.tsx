import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IWeekDTO } from '@lib/apis/challenge/challengeDTO';
import styled from 'styled-components';
import Summary from './Summary';

interface KidSummaryProps {
  isAllSuccess: boolean;
  kidSummary: IWeekDTO | undefined;
}

function KidSummary({ isAllSuccess, kidSummary }: KidSummaryProps) {
  let content;
  if (isAllSuccess) {
    const { currentSavings, totalPrice } = kidSummary!;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings}
        totalPrice={totalPrice}
      />
    );
  } else {
    content = <SkeletonSummary variant="KidHome" />;
  }

  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
