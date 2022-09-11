import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { useAppSelector } from '@store/app/hooks';
import {
  selectWalkingDongils,
  selectWalkingDongilsStatus,
} from '@store/slices/walkingDongilsSlice';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContractNewDongilLink from './ContractNewDongilLink';
import EmptyWalkingDongil from './EmptyWalkingDongil';
import WalkingDongilList from './WalkingDongilList';

function WalkingDongilSection() {
  const walkingDongilsStatus = useAppSelector(selectWalkingDongilsStatus);
  const walkingDongils = useAppSelector(selectWalkingDongils);
  const navigate = useNavigate();
  const { setOpenBottomSheet } = useGlobalBottomSheet();
  const [createDisabled, setCreateDisabled] = useState<boolean>(false);

  const navigateCreateDongil = () => {
    console.log(dayjs().day());
    if (dayjs().day() === 0) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        sheetProps: { open: true },
        contentProps: { type: 'sunday' },
      });
      setCreateDisabled(true);
    } else if (walkingDongils.length === 5) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        sheetProps: { open: true },
        contentProps: { type: 'createExceeded' },
      });
      setCreateDisabled(true);
    } else {
      navigate('create/1');
    }
  };

  let content: JSX.Element = <></>;
  if (walkingDongilsStatus === 'loading') {
    content = <SkeletonDongilList variant="walking" />;
  } else if (walkingDongilsStatus === 'succeeded') {
    if (walkingDongils?.length === 0) {
      content = (
        <EmptyWalkingDongil
          onClick={navigateCreateDongil}
          createDisabled={createDisabled}
        />
      );
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
      {walkingDongilsStatus !== 'idle' && <h1>걷고있는 돈길</h1>}
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
