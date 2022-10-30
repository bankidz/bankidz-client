import challengeAPI from '@lib/apis/challenge/challengeAPI';
import { HOME_REFETCH_INTERVAL } from '@lib/constants/HOME_REFETCH_INTERVAL';
import queryKeys from '@lib/constants/queryKeys';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ProposedDongilList from './ProposedDongilList';

function ProposedDongilSection() {
  const selectedKid = useAppSelector(selectSelectedKid);
  const { data: proposedDongils } = useQuery(
    [queryKeys.CHALLENGE_KID, selectedKid?.kidId, 'pending'],
    () => challengeAPI.getChallengeKid(selectedKid!.kidId, 'pending'),
    {
      refetchInterval: HOME_REFETCH_INTERVAL,
      suspense: true,
    },
  );

  let content;
  if (proposedDongils?.challengeList.length === 0) {
    content = <EmptyDongil subject="제안받은" />;
  } else {
    content = (
      <ProposedDongilList proposedDongils={proposedDongils?.challengeList!} />
    );
  }

  return (
    <Wrapper>
      <h1>제안받은 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default ProposedDongilSection;

export const ProposedDongilStyle = styled.div`
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
  ${ProposedDongilStyle};
`;
