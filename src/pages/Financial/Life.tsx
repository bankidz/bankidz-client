import { useNavigate } from 'react-router-dom';

function Life() {
  const navigate = useNavigate();
  return (
    <>
      부모-금융 생활 전체보기
      <button onClick={() => navigate('2')}>금융 생활 article 2</button>
    </>
  );
}
export default Life;
