import { useEffect } from 'react';
import { useAppDispatch } from '@store/app/hooks';
import { useNavigate } from 'react-router-dom';

function APPLEAuthRedirectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('AppleIDSignInOnSuccess', (data) => {
      console.log('handle successful response');
      console.log('data:', data);
    });
    document.addEventListener('AppleIDSignInOnFailure', (error) => {
      console.log('handle error');
      console.log('error: ', error);
    });
  }, []);

  return <p>애플 로그인 처리중입니다...</p>;
}

export default APPLEAuthRedirectPage;

// https://tlog.tammolo.com/posts/apple-login-02
// https://developer111.tistory.com/57?category=948844
