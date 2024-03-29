import styled from 'styled-components';
import AppBar from '@components/atoms/layout/AppBar';
import GuideTemplate from '@components/blocks/manage/guides/GuideTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

function Guides() {
  const isKid = useAppSelector(selectIsKid);
  return (
    <Wrapper>
      <AppBar label="서비스 이용 방법" to="/mypage/manage" />
      <GuideTemplate page={'manage'} isKid={isKid!} />
    </Wrapper>
  );
}
export default Guides;

const Wrapper = styled.div`
  position: absolute;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.greyScale.grey100};
`;
