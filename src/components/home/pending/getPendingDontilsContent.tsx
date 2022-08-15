import { useAppSelector } from '@store/app/hooks';
import {
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import EmptyDongil from '../EmptyDongil';
import SkeletonDongilList from '../SkeletonDongilList';
import PendingDongilList from './PendingDongilList';

function getPendingDongilsContent(
  onDeleteCheckOpen: () => void,
  setIdToDelete: Dispatch<SetStateAction<number | null>>,
) {
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  let pendingDongilsContent;
  if (pendingDongilsStatus === 'loading') {
    pendingDongilsContent = (
      <>
        <h1>대기중인 돈길</h1>
        <SkeletonDongilList variant="pending" />
      </>
    );
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils?.length === 0) {
      pendingDongilsContent = (
        <>
          <h1>대기중인 돈길</h1>
          <EmptyDongil property="pending" />
        </>
      );
    } else {
      pendingDongilsContent = (
        <>
          <h1>대기중인 돈길</h1>
          <PendingDongilList
            pendingDongils={pendingDongils!}
            onDeleteCheckOpen={onDeleteCheckOpen}
            setIdToDelete={setIdToDelete}
          />
        </>
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    pendingDongilsContent = <p>Failed</p>;
  }
  return pendingDongilsContent;
}

export default getPendingDongilsContent;
