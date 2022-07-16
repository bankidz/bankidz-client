import TopAppBar from '@components/layout/AppBar';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import { axiosPublic } from '@lib/api/axios';

function RegisterPage() {
  // function handleClick() {
  //   console.log('click!');
  //   const refresh = async () => {
  //     console.log('async!');
  //     try {
  //       const response = await axiosPublic.get('/user/refresh');
  //       console.log(response.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   refresh();
  // }
  return (
    <>
      <ForegroundTemplate label="">
        <div>register birth</div>
      </ForegroundTemplate>
      {/* <button onClick={handleClick}>토큰 리프레시 테스트</button> */}
    </>
  );
}

export default RegisterPage;
