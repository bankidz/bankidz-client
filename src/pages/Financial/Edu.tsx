import { useNavigate } from 'react-router-dom';

function Edu() {
  const navigate = useNavigate();
  return (
    <>
      부모-금융 교육 전체보기
      <button onClick={() => navigate('1')}>금융 교육 article 1</button>
    </>
  );
}
export default Edu;
