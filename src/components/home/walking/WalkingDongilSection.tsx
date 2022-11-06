import dayjs from 'dayjs';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ContractNewDongilLink from './ContractNewDongilLink';
import EmptyWalkingDongil from './EmptyWalkingDongil';
import WalkingDongilList from './WalkingDongilList';
import { EDayOfWeek } from '@lib/types/EDayOfWeek';
import useGlobalBottomSheet from '@lib/hooks/useGlobalBottomSheet';
import queryKeys from '@lib/constants/queryKeys';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

function WalkingDongilSection() {
  const { data: walkingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'walking'],
    () => challengeAPI.getChallenge('walking'),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

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
    } /* else if (dayjs().day() === EDayOfWeek.SUNDAY) { //TODO : 돈길 계약 일요일 제한 임시로 풀었습니다
      setOpenBottomSheet({
        sheetContent: 'Notice',
        contentProps: { type: 'sunday' },
      });
      setCreateDisabled(true);
    } */ else {
      navigate('create', { state: { prevBackground: '/' } });
    }
  };

  let content;
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

  return (
    <Wrapper>
      <h1>걷고있는 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default WalkingDongilSection;

export const walkingDongilWrapperStyle = css`
  margin-top: 48px;
  h1 {
    width: 100%;
    height: 16px;
    margin-bottom: 24px;
    ${({ theme }) => theme.typo.fixed.HomeSubtitle_T_16_EB};
    ${({ theme }) => theme.palette.greyScale.black};
  }
`;

const Wrapper = styled.section`
  ${walkingDongilWrapperStyle}
`;
