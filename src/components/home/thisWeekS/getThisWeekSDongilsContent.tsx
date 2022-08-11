import { useAppSelector } from '@store/app/hooks';
import { selectSelectedKid } from '@store/slices/kidsSlice';
import {
  selectThisWeekSDongils,
  selectThisWeekSDongilsStatus,
} from '@store/slices/thisWeekSDongilsSlice';
import EmptyDongil from '../EmptyDongil';
import SkeletonDongilList from '../SkeletonDongilList';
import ThisWeekSDongilList from './ThisWeekSDongilList';

function getThisWeekSDongilsContent() {
  const thisWeekSDongils = useAppSelector(selectThisWeekSDongils);
  const thisWeekSDongilsStatus = useAppSelector(selectThisWeekSDongilsStatus);
  const selectedKid = useAppSelector(selectSelectedKid);

  if (thisWeekSDongilsStatus === 'loading') {
    return (
      <>
        <h1>금주의 돈길</h1>
        <SkeletonDongilList variant="thisWeekS" />
      </>
    );
  } else if (thisWeekSDongilsStatus === 'succeeded') {
    const selectedKidSThisWeekSDongils = getSelectedKidSThisWeekSDongils(
      selectedKid?.username!,
    );
    if (thisWeekSDongils?.length === 0) {
      return (
        <>
          <h1>금주의 돈길</h1>
          <EmptyDongil property="thisWeekS" />
        </>
      );
    } else {
      return (
        <>
          <h1>금주의 돈길</h1>
          <ThisWeekSDongilList
            thisWeekSDongils={selectedKidSThisWeekSDongils!}
          />
        </>
      );
    }
  } else if (thisWeekSDongilsStatus === 'failed') {
    return <p>Failed</p>;
  }

  function getSelectedKidSThisWeekSDongils(username: string) {
    const found = thisWeekSDongils?.find(
      (thisWeekSDongil) => thisWeekSDongil.userName === username,
    );
    return found?.challengeList;
  }
}

export default getThisWeekSDongilsContent;
