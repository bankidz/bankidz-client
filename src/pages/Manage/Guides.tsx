import AppBar from '@components/layout/AppBar';
import GuideTemplate from '@components/manage/guides/GuideTemplate';
import getLocalStorage from '@lib/utils/localStorage/getLocalStorage';

const Guides = () => {
  const isKid = getLocalStorage('isKid');
  return (
    <>
      <AppBar label="서비스 이용 방법" to="/manage" />
      <GuideTemplate page={'manage'} isKid={isKid} />
    </>
  );
};
export default Guides;
