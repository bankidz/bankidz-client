import { useAppSelector } from '@store/app/hooks';
import {
  selectWalkingDongils,
  selectWalkingDongilsStatus,
} from '@store/slices/walkingDongilsSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SkeletonDongilList from '../SkeletonDongilList';
import ContractNewDongilLink from './ContractNewDongilLink';
import EmptyWalkingDongil from './EmptyWalkingDongil';
import WalkingDongilList from './WalkingDongilList';

function WalkingDongilSection() {
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const navigate = useNavigate();

  let content: JSX.Element = <></>;
  if (walkingDongilsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (walkingDongilsStatus === 'succeeded') {
    if (walkingDongils?.length === 0) {
      content = <EmptyWalkingDongil onClick={() => navigate('/create/1')} />;
    } else {
      content = (
        <>
          <WalkingDongilList walkingDongils={walkingDongils!} />
          <ContractNewDongilLink to={'/create/1'} />
        </>
      );
    }
  } else if (walkingDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }

  return (
    <Wrapper>
      <h1>걷고있는 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default WalkingDongilSection;

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
