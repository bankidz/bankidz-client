import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IKidWeekDTO } from '@lib/apis/challenge/challengeDTO';
import { TStatus } from '@lib/types/TStatus';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import styled from 'styled-components';
import Summary from './Summary';

interface ParentSummaryProps {
  parentSummaryStatus: TStatus;
  parentSummaryData: IKidWeekDTO | undefined;
}

function ParentSummary({
  parentSummaryStatus,
  parentSummaryData,
}: ParentSummaryProps) {
  const selectedKid = useAppSelector(selectSelectedKid);
  let content;
  if (parentSummaryStatus === 'loading') {
    content = <SkeletonSummary variant="ParentHome" />;
  } else if (parentSummaryStatus === 'success') {
    const { currentSavings, totalPrice } = parentSummaryData!.weekInfo;
    content = (
      <Summary
        variant="ParentHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
        username={selectedKid?.username}
      />
    );
  } else if (parentSummaryStatus === 'error') {
    content = <SkeletonSummary variant="ParentHome" />;
  }
  return <Wrapper>{content}</Wrapper>;
}

export default ParentSummary;

const Wrapper = styled.div`
  margin-top: 198px;
`;
