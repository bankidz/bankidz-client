import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { useAppSelector } from '@store/app/hooks';
import {
  selectPendingDongils,
  selectPendingDongilsStatus,
} from '@store/slices/pendingDongilsSlice';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import PendingDongilList from './PendingDongilList';

function PendingDongilSection() {
  const pendingDongilsStatus = useAppSelector(selectPendingDongilsStatus);
  const pendingDongils = useAppSelector(selectPendingDongils);

  let content: JSX.Element = <></>;
  if (pendingDongilsStatus === 'loading') {
    content = <SkeletonDongilList variant="pending" />;
  } else if (pendingDongilsStatus === 'succeeded') {
    if (pendingDongils?.length === 0) {
      content = (
        <>
          <EmptyDongil subject="대기중인" />
        </>
      );
    } else {
      content = (
        <>
          <PendingDongilList pendingDongils={pendingDongils!} />
        </>
      );
    }
  } else if (pendingDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  return (
    <Wrapper>
      {pendingDongilsStatus !== 'idle' && <h1>대기중인 돈길</h1>}
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
