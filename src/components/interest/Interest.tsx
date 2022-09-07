import FixedBar from '@components/home/homeTemplate/FixedBar';
import NoFamily from '@components/home/NoFamily';
import { useAppSelector } from '@store/app/hooks';
import { selectFamily, selectFamilyStatus } from '@store/slices/familySlice';
import styled from 'styled-components';
import InterestTemplate from './InterestTemplate';
import InterestToPay from './InterestToPay';

function Interest() {
  const family = useAppSelector(selectFamily);
  const familyStatus = useAppSelector(selectFamilyStatus);
  const hasNoFamily = family?.length === 0 && familyStatus === 'succeeded';

  return (
    <>
      {hasNoFamily ? (
        <NoFamily variant="Interest" />
      ) : (
        <>
          <InterestTemplate>
            <FlexContainer>
              <InterestToPay />
            </FlexContainer>
          </InterestTemplate>
        </>
      )}
    </>
  );
}

export default Interest;

const FlexContainer = styled.div`
  margin-top: 100px;
`;
