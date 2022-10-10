import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { IKidChallengeListDTO } from '@lib/apis/challenge/challengeDTO';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ThisWeekSDongilList from './ThisWeekSDongilList';

interface ThisWeekSDongilSectionProps {
  thisWeekSDongils: IKidChallengeListDTO | undefined;
  isAllSuccess: boolean;
}

function ThisWeekSDongilSection({
  thisWeekSDongils,
  isAllSuccess,
}: ThisWeekSDongilSectionProps) {
  let content;
  if (isAllSuccess) {
    if (thisWeekSDongils?.challengeList.length === 0) {
      content = <EmptyDongil subject="걷고있는" />;
    } else {
      content = (
        <ThisWeekSDongilList
          thisWeekSDongils={thisWeekSDongils?.challengeList!}
        />
      );
    }
  } else {
    content = <SkeletonDongilList variant="thisWeekS" />;
  }

  return (
    <Wrapper>
      <h1>금주의 돈길</h1>
      {content}
    </Wrapper>
  );
}

export default ThisWeekSDongilSection;

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
