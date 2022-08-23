import HomeTemplate from '@components/home/homeTemplate/HomeTemplate';
import ParentHome from '@components/home/ParentHome';

function ParentHomePage() {
  return (
    <>
      <HomeTemplate variant="ParentHome">
        <ParentHome />
      </HomeTemplate>
    </>
  );
}

export default ParentHomePage;
