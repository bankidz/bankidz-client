import AppBar from '@components/layout/AppBar';
import GuideTemplate from '@components/manage/guides/GuideTemplate';
import { useAppSelector } from '@store/app/hooks';
import { selectIsKid } from '@store/slices/authSlice';

const Guides = () => {
  const isKid = useAppSelector(selectIsKid);
  return (
    <>
      <AppBar label="서비스 이용 방법" to="/manage" />
      <GuideTemplate page={'manage'} isKid={isKid!} />
    </>
  );
};
export default Guides;
