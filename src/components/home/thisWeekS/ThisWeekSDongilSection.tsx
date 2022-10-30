import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled, { css } from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ThisWeekSDongilList from './ThisWeekSDongilList';

function ThisWeekSDongilSection() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { data: thisWeekSDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'walking'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'walking'),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

  let content;
  if (thisWeekSDongils?.challengeList.length === 0) {
    content = <EmptyDongil subject="걷고있는" />;
  } else {
    content = (
      <ThisWeekSDongilList
        thisWeekSDongils={thisWeekSDongils?.challengeList!}
      />
    );
  }

  return (
    <Wrapper>
      <h1>금주의 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default ThisWeekSDongilSection;

export const thisWeekSDongilStyle = css`
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
  ${thisWeekSDongilStyle}
`;
