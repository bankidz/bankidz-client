import NoFamily from '@components/home/NoFamily';
import familyAPI from '@lib/apis/family/familyAPI';
import queryKeys from '@lib/constants/queryKeys';
import { useQuery } from 'react-query';
import InterestHistorySection from './interestHistory/InterestHistorySection';
import InterestTemplate from './InterestTemplate';
import InterestToPaySection from './interestToPay/InterestToPaySection';

function Interest() {
  const { data: kids } = useQuery(queryKeys.FAMILY_KID, familyAPI.getKid);

  let content;
  if (kids?.length === 0) {
    content = <NoFamily variant="Interest" />;
  } else {
    content = (
      <InterestTemplate>
        <InterestToPaySection />
        <InterestHistorySection />
      </InterestTemplate>
    );
  }

  return <>{content}</>;
}

export default Interest;
