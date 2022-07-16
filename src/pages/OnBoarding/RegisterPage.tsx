import TopAppBar from '@components/layout/TopAppBar';
import { axiosPublic } from '@lib/api/axios';

function RegisterPage() {
  // 테스트 중입니다.
  function handleClick() {
    console.log('click!');
    const refresh = async () => {
      console.log('async!');
      try {
        const response = await axiosPublic.get('/user/refresh');
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    refresh();
  }
  return (
    <>
      <TopAppBar label="" />
      <button onClick={handleClick}>토큰 리프레시 테스트</button>
    </>
  );
}

export default RegisterPage;
