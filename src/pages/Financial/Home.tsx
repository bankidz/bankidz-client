import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <>
      부모-금융콘텐츠 홈
      <button
        onClick={() => {
          navigate('edu');
        }}
      >
        금융 교육 전체보기
      </button>
      <button
        onClick={() => {
          navigate('edu/1');
        }}
      >
        금융 교육 article 1
      </button>
      <button
        onClick={() => {
          navigate('life');
        }}
      >
        금융 생활 전체보기
      </button>
      <button
        onClick={() => {
          navigate('life/2');
        }}
      >
        금융 생활 article 2
      </button>
    </>
  );
}

export default Home;

//https://stackoverflow.com/questions/70671988/difference-in-the-navigation-react-router-v6
