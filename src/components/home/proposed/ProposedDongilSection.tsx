import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectProposedDongils,
  selectProposedDongilsStatus,
} from '@store/slices/proposedDongilsSlice';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ProposedDongilList from './ProposedDongilList';

function ProposedDongilSection() {
  const proposedDongils = useAppSelector(selectProposedDongils);
  const proposedDongilsStatus = useAppSelector(selectProposedDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);

  let content: JSX.Element = <></>;
  if (proposedDongilsStatus === 'loading') {
    content = <SkeletonDongilList variant="proposed" />;
  } else if (proposedDongilsStatus === 'succeeded') {
    const getSelectedKidSProposedDongils = (username: string) => {
      const found = proposedDongils?.find(
        (proposedDongil) => proposedDongil.userName === username,
      );
      return found?.challengeList;
    };
    const selectedKidSProposedDongils = getSelectedKidSProposedDongils(
      selectedKid?.username!,
    );

    if (selectedKidSProposedDongils?.length === 0) {
      content = <EmptyDongil variant="proposed" />;
    } else {
      content = (
        <ProposedDongilList proposedDongils={selectedKidSProposedDongils!} />
      );
    }
  } else if (proposedDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return (
    <Wrapper>
      {proposedDongilsStatus !== 'idle' && <h1>제안받은 돈길</h1>}
      {content}
    </Wrapper>
  );
}

export default ProposedDongilSection;

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
