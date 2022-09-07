import FixedBar from '@components/home/homeTemplate/FixedBar';
import NoFamily from '@components/home/NoFamily';
import { useAppSelector } from '@store/app/hooks';
import { selectFamily, selectFamilyStatus } from '@store/slices/familySlice';
import styled from 'styled-components';
import InterestTemplate from './InterestTemplate';

function Interest() {
  const family = useAppSelector(selectFamily);
  const familyStatus = useAppSelector(selectFamilyStatus);
  const hasNoFamily = family?.length === 0 && familyStatus === 'succeeded';

  return (
    <Wrapper>
      {hasNoFamily ? (
        <NoFamily variant="Interest" />
      ) : (
        <>
          <InterestTemplate>
            <span>test</span>
          </InterestTemplate>
        </>
      )}
    </Wrapper>
  );
}

export default Interest;

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(var(--vh, 1vh) * 100);
`;
