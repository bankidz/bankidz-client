import { useAppSelector } from '@store/app/hooks';
import {
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import SkeletonDongilList from '../SkeletonDongilList';
import PendingDongilList from './PendingDongilList';

interface PendingDongilSectionProps {
  onWarningDeleteSheetOpen: () => void;
  setIdToDelete: Dispatch<SetStateAction<number | null>>;
}

function PendingDongilSection({
  onWarningDeleteSheetOpen,
  setIdToDelete,
}: PendingDongilSectionProps) {
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  let content: JSX.Element = <></>;
  if (pendingDongilsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils?.length === 0) {
      content = (
        <>
          <EmptyDongil variant="pending" />
        </>
      );
    } else {
      content = (
        <>
          <PendingDongilList
            pendingDongils={pendingDongils!}
            onWarningDeleteSheetOpen={onWarningDeleteSheetOpen}
            setIdToDelete={setIdToDelete}
          />
        </>
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return (
    <Wrapper>
      <h1>대기중인 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default PendingDongilSection;

const Wrapper = styled.section`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;
