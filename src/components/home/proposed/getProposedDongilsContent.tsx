import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import SkeletonDongilList from '../SkeletonDongilList';
import ProposedDongilList from './ProposedDongilList';

function getProposedDongilsContent(
  onApproveCheckOpen: () => void,
  setIdToApprove: Dispatch<SetStateAction<number | null>>,
) {
  const proposedDongils = useAppSelector(selectProposedDongils);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);

  if (proposedDongilsStatus === 'loading') {
    return (
      <>
        <h1>제안받은 돈길</h1>
        <SkeletonDongilList variant="proposed" />
      </>
    );
  } else if (proposedDongilsStatus === 'succeeded') {
    const selectedKidSProposedDongils = getSelectedKidSProposedDongils(
      selectedKid?.username!,
    );
    if (selectedKidSProposedDongils?.length === 0) {
      return <EmptyDongil property="proposed" />;
    } else {
      return (
        <>
          <h1>제안받은 돈길</h1>
          <ProposedDongilList
            proposedDongils={selectedKidSProposedDongils!}
            onApproveCheckOpen={onApproveCheckOpen}
            setIdToApprove={setIdToApprove}
          />
        </>
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    return <p>Failed</p>;
  }

  function getSelectedKidSProposedDongils(username: string) {
    const found = proposedDongils?.find(
      (proposedDongil) => proposedDongil.userName === username,
    );
    return found?.challengeList;
  }
}

export default getProposedDongilsContent;

const Wrapper = styled.div``;
