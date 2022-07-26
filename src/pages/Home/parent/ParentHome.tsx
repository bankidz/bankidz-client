import { useNavigate } from 'react-router-dom';

function HomeParent() {
  const navigate = useNavigate();
  return (
    <>
      부모 - 홈페이지
      <button
        onClick={() => {
          navigate('/pending/1');
        }}
      >
        제안받은 돈길 페이지
      </button>
      <button
        onClick={() => {
          navigate('/now/1');
        }}
      >
        걷고있는 돈길 페이지
      </button>
    </>
  );
}

export default HomeParent;
