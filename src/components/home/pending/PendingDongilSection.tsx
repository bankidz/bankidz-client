import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import PendingDongilList from './PendingDongilList';
import queryKeys from '@lib/constants/queryKeys';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import challengeAPI from '@lib/apis/challenge/challengeAPI';

function PendingDongilSection() {
  const { data: pendingDongils } = useQuery(
    [queryKeys.CHALLENGE, 'pending'],
    () => challengeAPI.getChallenge('pending'),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

  let content;
  if (pendingDongils?.length === 0) {
    content = <EmptyDongil subject="대기중인" />;
  } else {
    content = <PendingDongilList pendingDongils={pendingDongils!} />;
  }

  return (
    <Wrapper>
      <h1>대기중인 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default PendingDongilSection;

export const pendingDongilWrapperStyle = css`
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
  ${pendingDongilWrapperStyle}
`;
