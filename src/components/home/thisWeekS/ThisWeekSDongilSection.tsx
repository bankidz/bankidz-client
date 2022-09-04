import SkeletonDongilList from '@components/common/skeletons/SkeletonDongilList';
import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import styled from 'styled-components';
import EmptyDongil from '../EmptyDongil';
import ThisWeekSDongilList from './ThisWeekSDongilList';

function ThisWeekSDongilSection() {
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);

  let content: JSX.Element = <></>;
  if (thisWeekSDongilsStatus === 'loading') {
    content = <SkeletonDongilList variant="thisWeekS" />;
  } else if (thisWeekSDongilsStatus === 'succeeded') {
    const getSelectedKidSThisWeekSDongils = (kidId: number) => {
      const found = thisWeekSDongils?.find(
        (thisWeekSDongil) => thisWeekSDongil.kidId === kidId,
      );
      return found?.challengeList;
    };
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.kidId!,
    );

    if (selectedKidSThisWeekSDongils?.length === 0) {
      content = <EmptyDongil variant="thisWeekS" />;
    } else {
      content = (
        <ThisWeekSDongilList thisWeekSDongils={selectedKidSThisWeekSDongils!} />
      );
    }
  } else if (thisWeekSDongilsStatus === 'failed') {
    content = <p>Failed</p>;
  }

  return (
    <Wrapper>
      {thisWeekSDongilsStatus !== 'idle' && <h1>금주의 돈길</h1>}
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
