import RegisterBirth from '@components/common/register/RegisterBirth';
import RegisterRole from '@components/common/register/RegisterRole';
import ForegroundTemplate from '@components/layout/ForegroundTemplate';
import MarginTemplate from '@components/layout/MarginTemplate';
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
        <MarginTemplate>
          <RegisterBirth />
          {/* <RegisterRole /> */}
        </MarginTemplate>
      </ForegroundTemplate>
      {/* <button onClick={handleClick}>토큰 리프레시 테스트</button> */}
    </>
  );
}

export default RegisterPage;
