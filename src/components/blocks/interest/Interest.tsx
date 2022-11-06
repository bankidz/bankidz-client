import { useQuery } from 'react-query';
import InterestHistorySection from './interestHistory/InterestHistorySection';
import InterestTemplate from './InterestTemplate';
import InterestToPaySection from './interestToPay/InterestToPaySection';
import queryKeys from '@lib/constants/queryKeys';
import familyAPI from '@lib/apis/family/familyAPI';
import NoFamily from '@components/blocks/home/NoFamily';

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
