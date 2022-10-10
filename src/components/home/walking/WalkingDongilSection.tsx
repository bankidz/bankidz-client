import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import { EDayOfWeek } from '@lib/types/EDayOfWeek';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContractNewDongilLink from './ContractNewDongilLink';
import EmptyWalkingDongil from './EmptyWalkingDongil';
import WalkingDongilList from './WalkingDongilList';

interface WalkingDongilSectionProps {
  isAllSuccess: boolean;
  walkingDongils: IChallengeDTO[] | undefined;
}

function WalkingDongilSection({
  isAllSuccess,
  walkingDongils,
}: WalkingDongilSectionProps) {
  const navigate = useNavigate();
  const { setOpenBottomSheet } = useGlobalBottomSheet();
  const [createDisabled, setCreateDisabled] = useState<boolean>(false);

  const navigateToCreateDongil = () => {
    if (walkingDongils?.length === 5) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        contentProps: { type: 'createExceeded' },
      });
      setCreateDisabled(true);
    } else if (dayjs().day() === EDayOfWeek.SUNDAY) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        contentProps: { type: 'sunday' },
      });
      setCreateDisabled(true);
    } else {
      navigate('create');
    }
  };

  let content;
  if (isAllSuccess) {
    if (walkingDongils?.length === 0) {
      content = (
        <EmptyWalkingDongil
          onClick={navigateToCreateDongil}
          createDisabled={createDisabled}
        />
      );
    } else {
      content = (
        <>
          <WalkingDongilList walkingDongils={walkingDongils!} />
          <ContractNewDongilLink
            to={'/create'}
            createDisabled={createDisabled}
            navigateToCreateDongil={navigateToCreateDongil}
          />
        </>
      );
    }
  } else {
    content = <SkeletonDongilList variant="walking" />;
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
