import NoFamily from '@components/home/NoFamily';
import familyApi from '@lib/apis/family/familyApi';
import queryKeys from '@lib/constants/queryKeys';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import InterestTemplate from './InterestTemplate';
import InterestToPay from './InterestToPay';

function Interest() {
  const { data: kids } = useQuery(queryKeys.FAMILY_KID, familyApi.getFamilyKid);

  let content;
  if (kids?.length === 0) {
    content = <NoFamily variant="Interest" />;
  } else {
    content = (
      <InterestTemplate>
        <FlexContainer>
          <InterestToPay />
        </FlexContainer>
      </InterestTemplate>
    );
  }

  return <>{content}</>;
}

export default Interest;

const FlexContainer = styled.div`
  margin-top: 100px;
`;
