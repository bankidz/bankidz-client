import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IChallengeDTO } from '@lib/apis/challenge/challengeDTO';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import dayjs from 'dayjs';
import { useState } from 'react';
import { UseQueryResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ContractNewDongilLink from './ContractNewDongilLink';
import EmptyWalkingDongil from './EmptyWalkingDongil';
import WalkingDongilList from './WalkingDongilList';

interface WalkingDongilSectionProps {
  result: UseQueryResult<IChallengeDTO[], unknown>;
}

function WalkingDongilSection({ result }: WalkingDongilSectionProps) {
  const { status, data: walkingDongils } = result;

  const navigate = useNavigate();
  const { setOpenBottomSheet } = useGlobalBottomSheet();
  const [createDisabled, setCreateDisabled] = useState<boolean>(false);

  const navigateCreateDongil = () => {
    if (walkingDongils?.length === 5) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        sheetProps: { open: true },
        contentProps: { type: 'createExceeded' },
      });
      setCreateDisabled(true);
    } else if (dayjs().day() === 0) {
      setOpenBottomSheet({
        sheetContent: 'Notice',
        sheetProps: { open: true },
        contentProps: { type: 'sunday' },
      });
      setCreateDisabled(true);
    } else {
      navigate('create/1');
    }
  };

  let content: JSX.Element = <></>;
  if (status === 'loading') {
    content = <SkeletonDongilList variant="walking" />;
  } else if (status === 'success') {
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
          <ContractNewDongilLink
            to={'/create/1'}
            createDisabled={createDisabled}
            navigateCreateDongil={navigateCreateDongil}
          />
        </>
      );
    }
  } else if (status === 'error') {
    content = <p>Failed</p>;
  }

  return (
    <Wrapper>
      {status !== 'idle' && <h1>걷고있는 돈길</h1>}
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
