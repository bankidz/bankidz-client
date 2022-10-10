import SkeletonSummary from '@components/common/skeletons/SkeletonSummary';
import { IKidWeekDTO } from '@lib/apis/challenge/challengeDTO';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import styled from 'styled-components';
import Summary from './Summary';

interface ParentSummaryProps {
  parentSummary: IKidWeekDTO | undefined;
  isAllSuccess: boolean;
}

function ParentSummary({ parentSummary, isAllSuccess }: ParentSummaryProps) {
  const selectedKid = useAppSelector(selectSelectedKid);

  let content;
  if (isAllSuccess) {
    const { currentSavings, totalPrice } = parentSummary!.weekInfo;
    content = (
      <Summary
        variant="ParentHome"
        currentSavings={currentSavings!}
        totalPrice={totalPrice!}
        username={selectedKid?.username}
      />
    );
  } else {
    content = <SkeletonSummary variant="ParentHome" />;
  }

  return <Wrapper>{content}</Wrapper>;
}

export default ParentSummary;

const Wrapper = styled.div`
  margin-top: 198px;
`;
