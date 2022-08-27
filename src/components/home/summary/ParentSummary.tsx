import SkeletonSummary from '@components/skeletons/SkeletonSummary';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectParentSummaries,
  selectParentSummariesStatus,
} from '@store/slices/parentSummariesSlice';
import styled from 'styled-components';
import Summary from './Summary';

function ParentSummary() {
  const parentSummariesStatus = useAppSelector(selectParentSummariesStatus);
  const parentSummaries = useAppSelector(selectParentSummaries);
  const selectedKid = useAppSelector(selectSelectedKid);

  let content: JSX.Element = <></>;
  if (parentSummariesStatus === 'loading') {
    content = <SkeletonSummary variant="ParentHome" />;
  } else if (parentSummariesStatus === 'succeeded') {
    const getSelectedKidSParentSummary = (kidId: number) => {
      const found = parentSummaries?.find(
        (parentSummary) => parentSummary.kidId === kidId,
      );
      return found;
    };

    const selectedKidSParentSummary = getSelectedKidSParentSummary(
      selectedKid?.kidId!,
    );
    if (selectedKidSParentSummary) {
      const { currentSavings, totalPrice } = selectedKidSParentSummary.weekInfo;
      content = (
        <Summary
          variant="ParentHome"
          currentSavings={currentSavings!}
          totalPrice={totalPrice!}
          username={selectedKid?.username}
        />
      );
    }
  } else if (parentSummariesStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return <Wrapper>{content}</Wrapper>;
}

export default ParentSummary;

const Wrapper = styled.div`
  margin-top: 198px;
`;
