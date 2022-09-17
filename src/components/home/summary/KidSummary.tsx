import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IWeekDTO } from '@lib/apis/challenge/challengeDTO';
import { UseQueryResult } from 'react-query';
import styled from 'styled-components';
import Summary from './Summary';

interface KidSummaryProps {
  result: UseQueryResult<IWeekDTO, unknown>;
}

function KidSummary({ result }: KidSummaryProps) {
  const { status, data: kidSummary } = result;

  let content;
  if (status === 'loading') {
    content = <SkeletonSummary variant="KidHome" />;
  } else if (status === 'success') {
    const { currentSavings, totalPrice } = kidSummary;
    content = (
      <Summary
        variant="KidHome"
        currentSavings={currentSavings}
        totalPrice={totalPrice}
      />
    );
  } else if (status === 'error') {
    content = <Summary variant="KidHome" currentSavings={0} totalPrice={0} />;
  }

  return <SummaryWrapper>{content}</SummaryWrapper>;
}

export default KidSummary;

const SummaryWrapper = styled.div`
  margin-top: 198px;
`;
