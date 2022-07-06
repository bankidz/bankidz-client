import { useNavigate } from 'react-router-dom';
function HomeKid() {
  const navigate = useNavigate();

  return (
    <>
      자식 - 홈 페이지
      <button
        onClick={() => {
          navigate('/create?step=1');
        }}
      >
        새로운 돈길 계약하기
      </button>
      <button
        onClick={() => {
          navigate('/pending/1');
        }}
      >
        대기중인 돈길
      </button>
    </>
  );
}

export default HomeKid;
