import styled from 'styled-components';
import Summary from '../components/kid/home/Summary';
import ProfileButton from '../components/onboarding/ProfileButton';

function SungwooTestPage() {
  return (
    <Wrapper>
      <ProfileButton role="아빠" isSelected={false} />
      <Summary current={1000} goal={5000} month={6} week={4} />
    </Wrapper>
  );
}

export default SungwooTestPage;

const Wrapper = styled.div``;
