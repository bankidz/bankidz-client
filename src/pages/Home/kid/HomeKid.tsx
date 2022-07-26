import { useNavigate } from 'react-router-dom';
function HomeKid() {
  const navigate = useNavigate();

  return (
    <>
      자식 - 홈 페이지
      <button
        onClick={() => {
          navigate('/create/1', { state: { from: 'home' } });
        }}
      >
        새로운 돈길 계약하기
      </button>
      <button
        onClick={() => {
          navigate('/proceeding/1');
        }}
      >
        걷고 있는 돈길
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
