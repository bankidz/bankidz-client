import styled from 'styled-components';
import ProfileButton from '../components/onboarding/ProfileButton';

function TestPage() {
  return (
    <ComponentWrapper>
      <span>컴포넌트 랜더링 테스트용 페이지 입니다.</span>
      <ProfileButton role={'아빠'} />
      {/* <ProfileButton role={'아빠'}/> */}
      {/* <ProfileButton role={'아빠'}/> */}
      {/* <ProfileButton role={'아빠'}/> */}
    </ComponentWrapper>
  );
}

export default TestPage;

const ComponentWrapper = styled.div``;
