import styled from 'styled-components';
import TargetBadge from '../components/challenge/TargetBadge';
import Summary from '../components/homekid/Summary';
import ProfileButton from '../components/onboarding/ProfileButton';

function SungwooTestPage() {
  return (
    <Wrapper>
      <ProfileButton role="아빠" isSelected={false} />
      {/* <InterestBoosterBadge interestRate={10} /> */}
      {/* <TargetBadge targetSaving={100000} /> */}
      <Summary current={1000} goal={5000} month={6} week={4} />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div``;
